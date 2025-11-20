document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.getElementById("btnLogin");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginError = document.getElementById("loginError");

  btnLogin.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      loginError.textContent = "Veuillez remplir tous les champs !";
      return;
    }

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Connexion réussie
        window.location.href = "doctor.html"; // page du médecin
      })
      .catch((error) => {
        loginError.textContent = error.message;
      });
  });
});
