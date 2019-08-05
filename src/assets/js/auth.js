// var main = document.getElementById("main");

// function createNode(element){
//     return document.createElement(element); // Create the type of element you pass in the parameters
// }

// function append(parent, el){
// 	return parent.appendChild(el); // Append the second parameter(element) to the first one
// }

// function handleSubmit(){
// 	console.log('form submitted')
// }

window.onload = async function(){
	console.log('window invoked')
	const tokenStatus = await getTokenStatus();
	tokenStatus ? loadApp() :  loadForm();
	document.getElementById('main').classList.remove('hide')
};

async function getTokenStatus(){
	const currentTokenStatus = await window.localStorage.getItem("echoAuth");
	console.log(currentTokenStatus)
	return currentTokenStatus;
}

// function setAuthValue(value) {
// 	const authSection = document.getElementById("auth");
// 	authSection.innerText = value;
// }

async function toggleAuth(){
	const tokenStatus = await getTokenStatus();
	if (tokenStatus) {
		await window.localStorage.removeItem("echoAuth");
		authToken = null
	} else {
		await window.localStorage.setItem("echoAuth", "lolka");
		authToken = 'some-auth-token'
	}
	location.reload();
}


//This function is called in helper.js -- ideally need to return the authtoken when user is logged in and null when logged out
function getAuthToken(){
	return authToken
}

function loadForm(){
	document.getElementById('app').remove()
}

function loadApp(){
	document.getElementById('authForm').remove()
}
