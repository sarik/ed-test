function toggleDropdown(id) {
	let el = document.getElementById(id);
	if (el.className.includes("is-active")) {
		el.classList.remove("is-active");
	} else {
		el.className += " is-active";
	}
}

function getDisplayLanguage() {
	let lang = navigator.language;
	var locallang = lang;
	if (lang.indexOf("-") !== -1) {
		locallang = lang.split("-")[0];
		var dialect = lang.split("-")[1];
		return languageCodeMap[locallang] + "(" + dialect + ")";
	}

	return languageCodeMap[locallang];
}

function showToast(toastId) {
	let toast= document.getElementById(toastId);
	toast.classList.add('ed-toast--show');
	setTimeout(function() {toast.className = toast.className.replace('ed-toast--show', "")},2000);
}

function toggleShowPassword() {
	let passwordInput = document.getElementById("login-password");
	let passwordIcon = document.getElementById("show-password-icon")
  if (passwordInput.type === "password") {
		passwordInput.type = "text";
		passwordIcon.classList.add("fa-eye-slash")
  } else {
		passwordInput.type = "password";
		passwordIcon.classList.remove("fa-eye-slash")
  }
}


// Set a theme by default
const currentTheme = localStorage.getItem("theme");
currentTheme ? "" : localStorage.setItem("theme", "light");

function toggleDarkMode() {
	//store in cookies?
	if (currentTheme === "light") {
		localStorage.setItem("theme", "dark");
	} else {
		localStorage.setItem("theme", "light");
	}
	
	location.reload();
}

const navItems = document.querySelector("#mainNavbar > .navbar-start").children;
window.addEventListener("single-spa:app-change", evt => {
	for (j = 0; j < navItems.length; j++) {
		navItems[j].classList.remove("is-active");
		navItems[j].classList.remove("is-tab");
		if (window.location.href === navItems[j].href) {
			navItems[j].className += " is-tab is-active";
		}
	}
});

const languageCodeMap = {
	ab: "Abkhazian",
	aa: "Afar",
	af: "Afrikaans",
	ak: "Akan",
	sq: "Albanian",
	am: "Amharic",
	ar: "Arabic",
	an: "Aragonese",
	hy: "Armenian",
	as: "Assamese",
	av: "Avaric",
	ae: "Avestan",
	ay: "Aymara",
	az: "Azerbaijani",
	bm: "Bambara",
	ba: "Bashkir",
	eu: "Basque",
	be: "Belarusian",
	bn: "Bengali (Bangla)",
	bh: "Bihari",
	bi: "Bislama",
	bs: "Bosnian",
	br: "Breton",
	bg: "Bulgarian",
	my: "Burmese",
	ca: "Catalan",
	ch: "Chamorro",
	ce: "Chechen",
	ny: "Chichewa, Chewa, Nyanja",
	zh: "Chinese",
	"zh-Hans": "Chinese (Simplified)",
	"zh-Hant": "Chinese (Traditional)",
	cv: "Chuvash",
	kw: "Cornish",
	co: "Corsican",
	cr: "Cree",
	hr: "Croatian",
	cs: "Czech",
	da: "Danish",
	dv: "Divehi, Dhivehi, Maldivian",
	nl: "Dutch",
	dz: "Dzongkha",
	en: "English",
	eo: "Esperanto",
	et: "Estonian",
	ee: "Ewe",
	fo: "Faroese",
	fj: "Fijian",
	fi: "Finnish",
	fr: "French",
	ff: "Fula, Fulah, Pulaar, Pular",
	gl: "Galician",
	gd: "Gaelic (Scottish)",
	gv: "Gaelic (Manx)",
	ka: "Georgian",
	de: "German",
	el: "Greek",
	kl: "Greenlandic",
	gn: "Guarani",
	gu: "Gujarati",
	ht: "Haitian Creole",
	ha: "Hausa",
	he: "Hebrew",
	hz: "Herero",
	hi: "हिंदी",
	ho: "Hiri Motu",
	hu: "Hungarian",
	is: "Icelandic",
	io: "Ido",
	ig: "Igbo",
	in: "Indonesian",
	id: "Indonesian",
	ia: "Interlingua",
	ie: "Interlingue",
	iu: "Inuktitut",
	ik: "Inupiak",
	ga: "Irish",
	it: "Italian",
	ja: "Japanese",
	jv: "Javanese",
	kl: "Kalaallisut, Greenlandic",
	kn: "Kannada",
	kr: "Kanuri",
	ks: "Kashmiri",
	kk: "Kazakh",
	km: "Khmer",
	ki: "Kikuyu",
	rw: "Kinyarwanda (Rwanda)",
	rn: "Kirundi",
	ky: "Kyrgyz",
	kv: "Komi",
	kg: "Kongo",
	ko: "Korean",
	ku: "Kurdish",
	kj: "Kwanyama",
	lo: "Lao",
	la: "Latin",
	lv: "Latvian (Lettish)",
	li: "Limburgish ( Limburger)",
	ln: "Lingala",
	lt: "Lithuanian",
	lu: "Luga-Katanga",
	lg: "Luganda, Ganda",
	lb: "Luxembourgish",
	gv: "Manx",
	mk: "Macedonian",
	mg: "Malagasy",
	ms: "Malay",
	ml: "Malayalam",
	mt: "Maltese",
	mi: "Maori",
	mr: "Marathi",
	mh: "Marshallese",
	mo: "Moldavian",
	mn: "Mongolian",
	na: "Nauru",
	nv: "Navajo",
	ng: "Ndonga",
	nd: "Northern Ndebele",
	ne: "Nepali",
	no: "Norwegian",
	nb: "Norwegian bokmål",
	nn: "Norwegian nynorsk",
	ii: "Nuosu",
	oc: "Occitan",
	oj: "Ojibwe",
	cu: "Old Church Slavonic, Old Bulgarian",
	or: "Oriya",
	om: "Oromo (Afaan Oromo)",
	os: "Ossetian",
	pi: "Pāli",
	ps: "Pashto, Pushto",
	fa: "Persian (Farsi)",
	pl: "Polish",
	pt: "Portuguese",
	pa: "Punjabi (Eastern)",
	qu: "Quechua",
	rm: "Romansh",
	ro: "Romanian",
	ru: "Russian",
	se: "Sami",
	sm: "Samoan",
	sg: "Sango",
	sa: "Sanskrit",
	sr: "Serbian",
	sh: "Serbo-Croatian",
	st: "Sesotho",
	tn: "Setswana",
	sn: "Shona",
	ii: "Sichuan Yi",
	sd: "Sindhi",
	si: "Sinhalese",
	ss: "Siswati",
	sk: "Slovak",
	sl: "Slovenian",
	so: "Somali",
	nr: "Southern Ndebele",
	es: "Spanish",
	su: "Sundanese",
	sw: "Swahili (Kiswahili)",
	ss: "Swati",
	sv: "Swedish",
	tl: "Tagalog",
	ty: "Tahitian",
	tg: "Tajik",
	ta: "Tamil",
	tt: "Tatar",
	te: "Telugu",
	th: "Thai",
	bo: "Tibetan",
	ti: "Tigrinya",
	to: "Tonga",
	ts: "Tsonga",
	tr: "Turkish",
	tk: "Turkmen",
	tw: "Twi",
	ug: "Uyghur",
	uk: "Ukrainian",
	ur: "Urdu",
	uz: "Uzbek",
	ve: "Venda",
	vi: "Vietnamese",
	vo: "Volapük",
	wa: "Wallon",
	cy: "Welsh",
	wo: "Wolof",
	fy: "Western Frisian",
	xh: "Xhosa",
	ji: "Yiddish",
	yi: "Yiddish",
	yo: "Yoruba",
	za: "Zhuang, Chuang",
	zu: "Zulu"
};