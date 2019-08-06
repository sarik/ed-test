
	let language = navigator.language
	console.log(language)
	if(localStorage.language != language){
		document.getElementById('i18n').className += " is-active"
	}
	else{
		document.getElementById('i18n').remove()
	}


function handleI18n(language = navigator.language){
	localStorage.setItem('language', language)
	fetchTranslation(language)
}

function fetchTranslation(language){
	fetch(`http://localhost:8233/translations/${language}.json`)
		.then(res => {
			console.log(res)
			if(200 !== res.status){
				handleI18n('en')
			}

			return res.json()
		})
			.then(data => {
				localStorage.setItem('translation' , JSON.stringify({[language]: data}))
				location.reload()
				})
}