function toggleDropdown(id){
	let el = document.getElementById(id)
	if(el.className.includes('is-active')){
		el.classList.remove('is-active')
	}
	else{
		el.className += " is-active"
	}
}