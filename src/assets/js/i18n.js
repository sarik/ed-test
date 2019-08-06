
	const language = navigator.language
	console.log(language)
	if(localStorage.language != language){
		document.getElementById('i18n').className += " is-active"
	}
	else{
		document.getElementById('i18n').remove()
	}


function handleI18n(){
	localStorage.setItem('language', navigator.language)
	//fetchTranslation(navigator.language)
	// location.reload()
}

function fetchTranslation(language){
	fetch(`http://localhost:8233/translations/${language}.json`)
		.then(res => res.json())
			.then(data => {
				localStorage.setItem('translation' , JSON.stringify({[language]: data}))
				location.reload()
				})
}