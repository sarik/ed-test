var main = document.getElementById("main");

var authToken = "abc";

// function createNode(element) {
//     return document.createElement(element); // Create the type of element you pass in the parameters
// }

// function append(parent, el) {
// 	return parent.appendChild(el); // Append the second parameter(element) to the first one
// }

// function populateSkeleton(){
// 	let segment, grid, column, img

// 	grid = createNode('div');
// 	grid.className="ui centered grid";
// 	column = createNode('div');
// 	column.className="column"
	
// 	append(grid, column)
// 	column = createNode('div');
// 	column.className="eight wide column"
// 	img = createNode('img')
// 	img.src="http://placehold.it/600x300"
// 	append(column, img)
// 	append(grid,column)
// 	column = createNode('div');
// 	column.className="column"
// 	append(grid, column)
// 	append(main, grid)

// 	return grid
// }

// function populate_form() {
// 	let field, label, input, choices, description, form;
// 	let segment = populateSkeleton()

// 	form = createNode('form')
// 	form.id="form"
// 	form.className="ui form"
// 	form.addEventListener("submit", handleSubmit);	
// 	append(segment, form);
	

// 	field = createNode('div');
// 	field.className = "field required";
// 	input = createNode('input');
// 	input.type= "text";
// 	input.name= "username";
// 	input.required = true;
// 	label = createNode('label');
// 	label.innerHTML = "Email or Mobile Number"
	
// 	append(field, label)
// 	append(field , input);
// 	append(form, field);

// 	field = createNode('div');
// 	field.className = "field required";
// 	input = createNode('input');
// 	input.type= "password";
// 	input.name= "password";
// 	input.required = true;
// 	label = createNode('label');
// 	label.innerHTML = "Password"
	
// 	append(field, label)
// 	append(field , input);
// 	append(form, field);

// 	let button = createNode("button");
// 	button.type = "button";
// 	button.innerHTML = "Submit";
// 	button.className = "ui green button";
// 	// button.id = "submit_btn";
// 	button.addEventListener("click", handleSubmit);

// 	append(form, button);
// 	return form;
// }

function handleSubmit(){
	console.log('form submitted')
}

window.onload = async function() {
	console.log('loading function invoked')
	const tokenStatus = await getTokenStatus();
	tokenStatus ? loadApp() :  loadForm();
	document.getElementById('main').classList.remove('hide')
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
