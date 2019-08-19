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

const getCookie = function(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


const saveUsername = document.getElementsByName("save-username")[0];
const username = document.getElementsByName("username")[0];

window.onload = async function() {
	const tokenStatus = await getTokenStatus();
	tokenStatus ? loadApp() : loadForm();
	document.getElementById("main").classList.remove("hide");
	loadUserDetails()
	saveUsername.checked = window.localStorage.getItem("username");
	username.value = window.localStorage.getItem("username");

};

function loadUserDetails(){
	let username = document.getElementById('username')
	let userIconpic = document.getElementById("user-iconpic")
	if(username)
		{username.innerText= `${getCookie('firstName')} ${getCookie('lastName')}`}
	if(userIconpic){
		userIconpic.src = `${getCookie('iconpic')}` || "./img/user_demo.jpg";
	}
}

async function getTokenStatus() {
	const currentTokenStatus = await getCookie("token");
	return currentTokenStatus;
}

// function setAuthValue(value) {
// 	const authSection = document.getElementById("auth");
// 	authSection.innerText = value;
// }

// async function toggleAuth() {
// 	const tokenStatus = await getTokenStatus();
// 	if (tokenStatus) {
// 		await window.localStorage.removeItem("echoAuth");
// 		authToken = null;
// 	} else {
// 		if (saveUsername.checked) {
// 			window.localStorage.setItem("username", username.value);
// 		} else {
// 			window.localStorage.removeItem("username");
// 		}
// 		await window.localStorage.setItem("echoAuth", "lolka");
// 		authToken = "some-auth-token";
// 	}
// 	location.reload();
// }

async function signIn(event) {
	let currentTarget =  event.currentTarget
	 currentTarget.className += " is-loading"
	 currentTarget.setAttribute('disabled', true)
	 
	await fetch(
		"http://localhost:2222/api/v1/signin",
		{
			method: "POST",
			body: JSON.stringify({
				username: document.getElementsByName('username')[0].value,
				password: document.getElementsByName('password')[0].value
			})
		}
	)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data.success){
				if (saveUsername.checked) {
					window.localStorage.setItem("username", username.value);
				} else {
					window.localStorage.removeItem("username");
				}
				document.cookie = `token=${data.token};`
				document.cookie = `firstName=${data.user.firstName};`
				document.cookie = `lastName=${data.user.lastName};`
				document.cookie = `iconpic=${data.user.iconpic};`
				location.reload();
			}
			currentTarget.classList.remove("is-loading")
			currentTarget.removeAttribute('disabled')
		});
}

function signOut(){
	document.cookie = `token=`
	location.reload();
}

function loadForm() {
	document.getElementById("mainNavbar").remove();
}

function loadApp() {
	document.getElementById("authForm").remove();
}