document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("emailField").value;
  const password = document.getElementById("passwordField").value;
  const loginInfo = { email, password };

  // show error message inside #email .error
  document.querySelector("#email .error").textContent = "Invalid email";
  document.querySelector("#email .error").style.display = "block";

  // show error message inside #password .error
  document.querySelector("#password .error").textContent = "Invalid password";
  document.querySelector("#password .error").style.display = "block";

  console.log("Form submitted:", loginInfo);
});
