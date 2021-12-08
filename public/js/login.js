async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  //console.log(`${username} is now signed up with ${email}`);
  // all three input fields required
  if (username && email && password) {
    const res = await fetch("/api/users", {
      method: "post", // record what login page receives in input tags
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      console.log("success");
      document.location.replace("/shop");
    } else {
      alert(res.statusText);
    }
  }
}

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);

async function loginFormHandler(event) {
  event.preventDefault();
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const res = await fetch("/api/users/login", {
      method: "post", // record what view page receives in input tags
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      //console.log("logged in");
      document.location.replace("/shop"); // when you first successfully login, redirect to home page
    } else {
      alert(res.statusText);
    }
  }
}

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
