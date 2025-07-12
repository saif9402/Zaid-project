const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  window.location.href = "../index.html";
});
