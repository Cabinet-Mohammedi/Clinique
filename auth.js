// Initialize Firebase Auth
const auth = firebase.auth();

// === Créer automatiquement le compte médecin si non existant ===
const defaultEmail = "abdelmoula.djalal@gmail.com";
const defaultPassword = "docteur123";

auth.signInWithEmailAndPassword(defaultEmail, defaultPassword)
.catch((error) => {
    if (error.code === 'auth/user-not-found') {
        auth.createUserWithEmailAndPassword(defaultEmail, defaultPassword)
        .then(() => console.log("Compte médecin créé automatiquement"))
        .catch(err => console.error(err.message));
    } else {
        console.error(error.message);
    }
});

// === Connexion ===
document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("btnLogin");
    const emailInput = document.getElementById("email");
    const pwdInput = document.getElementById("password");
    const loginError = document.getElementById("loginError");

    if (btnLogin) {
        btnLogin.addEventListener("click", () => {
            auth.signInWithEmailAndPassword(emailInput.value, pwdInput.value)
            .then(() => {
                window.location.href = "doctor.html";
            })
            .catch(err => {
                loginError.textContent = err.message;
            });
        });
    }

    // === Protection pages médecin ===
    auth.onAuthStateChanged(user => {
        const medContent = document.getElementById("medContent");
        if (medContent) {
            if (user) medContent.style.display = "block";
            else window.location.href = "login.html";
        }
    });

    // === Déconnexion ===
    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            auth.signOut().then(() => window.location.href="login.html");
        });
    }

    // === Changer email ===
    const btnChangeEmail = document.getElementById("btnChangeEmail");
    if (btnChangeEmail) {
        btnChangeEmail.addEventListener("click", async () => {
            const user = auth.currentUser;
            if (user) {
                const newEmail = prompt("Entrez le nouvel email:");
                if (newEmail) {
                    try {
                        await user.updateEmail(newEmail);
                        alert("Email changé avec succès!");
                    } catch (err) {
                        alert(err.message);
                    }
                }
            }
        });
    }

    // === Changer mot de passe ===
    const btnChangePwd = document.getElementById("btnChangePwd");
    if (btnChangePwd) {
        btnChangePwd.addEventListener("click", async () => {
            const user = auth.currentUser;
            if (user) {
                const newPwd = prompt("Entrez le nouveau mot de passe:");
                if (newPwd) {
                    try {
                        await user.updatePassword(newPwd);
                        alert("Mot de passe changé avec succès!");
                    } catch (err) {
                        alert(err.message);
                    }
                }
            }
        });
    }
});
