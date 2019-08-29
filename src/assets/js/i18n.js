var language = navigator.language;

const intialMessage = {
	"en":{
		"we-ve-detected-that-your-device-language-is-set-to-local-language-would-you-like-to-set-local-language-as-your-default-language-for-echo-digital" : "We've detected that your device language is set to {displayLanguage}. Would you like to set English as your default language for ECHO Digital",
		"no-select-another-language" : "No, select another language",
		"set-language-as-display-language" : "Set language as {displayLanguage}"
	},

	"hi":{
		"we-ve-detected-that-your-device-language-is-set-to-local-language-would-you-like-to-set-local-language-as-your-default-language-for-echo-digital" : "हमने पाया है कि आपकी डिवाइस भाषा {displayLanguage} में सेट है। क्या आप ECHO Digital के लिए अपनी डिफ़ॉल्ट भाषा के रूप में {displayLanguage} सेट करना चाहते हैं",
		"no-select-another-language" : "नहीं, दूसरी भाषा चुनें",
		"set-language-as-display-language" : "भाषा को {displayLanguage} के रूप में सेट करें"
	}
	
}


if (localStorage.language != language) {
	localStorage.setItem("translation", JSON.stringify({ [navigator.language]: intialMessage[navigator.language.split('-')[0]]}))
	document.getElementById("i18n").className += " is-active";
} else {
	document.getElementById("i18n").remove();
}

function handleI18n(language = navigator.language) {
	localStorage.setItem("language", language);
	fetchTranslation(language);
}

function fetchTranslation(language) {
	fetch(`http://localhost:8233/translations/${language}.json`)
		.then(res => {
			if (200 !== res.status) {
				handleI18n("en");
			}

			return res.json();
		})
		.then(data => {
			localStorage.setItem(
				"translation",
				JSON.stringify({ [language]: data })
			);
			location.reload();
		});
}

var userLanguage = window.localStorage.language || "en";
const messages = localStorage.translation
	? JSON.parse(localStorage.translation)
	: {};

const formattedMessages = document.getElementsByClassName("formattedMessage");
for (var i = 0; i < formattedMessages.length; i++) {
	let formattedMessage = formattedMessages[i];
	let childNodes = formattedMessage.childNodes;
	let intlId = formattedMessage.getAttribute("intl-id");
	let variablesAttr = formattedMessage.getAttribute('variables')
	if(variablesAttr){
		var variables = JSON.parse(variablesAttr)
	}
	for (j = 0; j < childNodes.length; j++) {
		let childNode = childNodes[j];
		if (childNode.nodeType === 3 && childNode.nodeValue.trim() !== "") {
			if (messages[language][intlId]) {
				let message = new IntlMessageFormat.IntlMessageFormat(
					messages[language][intlId],
					language
				);
				if(variablesAttr){
					childNode.nodeValue = message.format(variables);
				}
				else{
					childNode.nodeValue = message.format();
				}
				formattedMessage.insertBefore(
					document.createTextNode("\u00A0"),
					childNode
				);
				break;
			}
		}
	}
}

// const es = {
// 	"set-language-as-local-language": "भाषा को {localLanguage} के रूप में सेट करें"
// };

// var enNumPhotos = new IntlMessageFormat.IntlMessageFormat(
// 	es["set-language-as-local-language"],
// 	language
// );

// const test = getlocallang()
// console.log(enNumPhotos.format({ localLanguage: test}));
