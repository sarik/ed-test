let main = document.getElementById("main");


window.onload = async function() {
	console.log("loaded");
	const tokenStatus = await getTokenStatus();
	tokenStatus ? loadApp() :  loadForm();
};

async function getTokenStatus() {
	const currentTokenStatus = await window.localStorage.getItem("echoAuth");
	return currentTokenStatus;
}

// function setAuthValue(value) {
// 	const authSection = document.getElementById("auth");
// 	authSection.innerText = value;
// }

async function toggleAuth() {
	const tokenStatus = await getTokenStatus();
	if (tokenStatus) {
		await window.localStorage.removeItem("echoAuth");
		// return null
	} else {
		await window.localStorage.setItem("echoAuth", "lolka");
		// return 'some-auth-token'
	}
	location.reload();
}

function loadForm(){
	main.innerHTML =
	"<button onclick='toggleAuth()'>Log in</button>";

}

function loadApp(){
	main.innerHTML =
	"<div class='navbar'><ul><a href='#/check-in'><li>Attendance</li></a><a href='#/account'><li>My Account</li></a></ul><button style='position: absolute; right: 1em' onclick='toggleAuth()'>Log out</button></div>"
}