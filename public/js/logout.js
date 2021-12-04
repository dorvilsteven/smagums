async function logout() {
  const res = await fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    //stay on the same page but with session destroyed
    document.location.replace("/");
  } else {
    alert(res.statusText);
  }
}

document.querySelector("#logout").addEventListener("click", logout);
