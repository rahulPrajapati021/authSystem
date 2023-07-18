function changeContext() {
  let login = document.getElementById("login");
  let signup = document.getElementById("signup");
  if (login.style.display == "block") {
    login.style.display = "none";
    signup.style.display = "block";
  } else if (signup.style.display == "block") {
    login.style.display = "block";
    signup.style.display = "none";
  } else {
    login.style.display = "block";
  }
}

let form = document.querySelector("#loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let body = {
    email: form.elements.email.value,
    password: form.elements.password.value
  } 

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/login", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.response);
      window.open("/chat", "_self");
      
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
});


let registerForm = document.querySelector("#registerForm");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let body = {
    firstName: registerForm.elements.firstName.value,
    lastName: registerForm.elements.lastName.value,
    email: registerForm.elements.email.value,
    password: registerForm.elements.password.value
  } 

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/register", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.response);
      window.open("/chat", "_self");
      
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
});
