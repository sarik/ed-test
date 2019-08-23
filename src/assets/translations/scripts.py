import gspread
import os
from slugify import slugify
from bs4 import BeautifulSoup, Tag
from oauth2client.service_account import ServiceAccountCredentials
import json
scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']
credentials = ServiceAccountCredentials.from_json_keyfile_name('sonu-pal-test-echo-india-474d2cadddc3.json', scope)
gc = gspread.authorize(credentials)
sheet = gc.open_by_key("1-Ry5Adqp-CWlwkO8ppc-i520wF07TY7ZNzaxfmB6k_Q")
master_translation_sheet = sheet.worksheet("Master Translation List")

def find_files(search_dir=None):
    if search_dir:
        files = [os.path.abspath(file) for file in os.listdir("".join([os.getcwd(), search_dir])) if file.endswith(".jsx") or file.endswith(".html")]
    else:
        files = []
        for r, d, f in os.walk(os.getcwd()):
            for file in f:
                if file.endswith(".jsx") or file.endswith(".html"):
                    files.append(os.path.join(r, file))
    for file in files:
        update_file_data(file)

    return "All Files Data Updated Successfully!"

def update_file_data(filepath):
    file = open(filepath, 'r')
    soup = BeautifulSoup(file)
    data = soup.find_all("fm")
    for obj in data:
        first_column_cell_count = len(master_translation_sheet.col_values(1))
        first_column_content = master_translation_sheet.col_values(1)
        new_tag = soup.new_tag("FormattedMessage")
        tag_name = " ".join(obj.string.split()).strip()
        if "$$" in tag_name:
            default_message = tag_name.replace("$$", "")
            description = default_message.lower()
            id = slugify(default_message)
            new_tag["id"] = id
            new_tag["default_message"] = "{`" + default_message.replace("'", "") + "`}"
            new_tag["description"] = description
            values = [value.replace("'", "") for value in tag_name.split("$$") if "{" in value]
            var_data = {}
            for v in values:
                v = v.replace("'", "")
                var_data[v] = "`$" + v + "`"
                print(var_data)
            new_tag["values"] = var_data
        else:
            id = slugify(tag_name)
            description = tag_name.lower()
            new_tag["id"] = id
            default_message = tag_name
            new_tag["default_message"] = default_message
            new_tag["description"] = description
        if id not in first_column_content:
            first_column_sheet = master_translation_sheet.update_cell(first_column_cell_count + 1, 1, id)
            second_column_sheet = master_translation_sheet.update_cell(first_column_cell_count + 1, 2, default_message)
        obj.replace_with(new_tag)
    file = open(filepath, 'w')
    file.writelines(soup.prettify(soup.original_encoding))
    file.close()
    return file



def fetch_json_data(save_directory=None):
    if save_directory:
        new_dir = "".join([os.getcwd(), save_directory])
        if not os.path.exists(new_dir):
            new_working_dir = os.makedirs(new_dir)
        os.chdir(new_dir)
    languages = master_translation_sheet.row_values(row=2)[1:]
    data = master_translation_sheet.get_all_values()[1:]
    header = data.pop(0)
    output = {}
    for language in languages:
        file = open(language.lower() + ".json", "w")
        for d in data:
            output[d[0]] = d[header.index(language)]
        json.dump(output, file)
    return "All Data Exported Successfully"