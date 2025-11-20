const btnLogin = document.getElementById("btnLogin");
const mdpInput = document.getElementById("mdpMedecin");
const loginError = document.getElementById("loginError");

const savedPwd = localStorage.getItem("mdpMedecin") || "docteur123";

btnLogin.addEventListener("click", () => {
  if (mdpInput.value.trim() === savedPwd) {
    localStorage.setItem("loggedMedecin", "true");
    window.location.href = "doctor.html";
  } else {
    loginError.textContent = "Mot de passe incorrect !";
  }
});
