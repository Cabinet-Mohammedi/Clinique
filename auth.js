// auth.js - Gestion de l'authentification du médecin

// Référence à Firebase
const medRef = db.ref("medecin");

// Vérifier si le médecin est connecté
export function isLogged() {
  return localStorage.getItem("loggedMedecin") === "true";
}

// Connexion du médecin
export function loginMedecin(inputPwd) {
  return medRef.child("password").once("value").then(snapshot => {
    const storedPwd = snapshot.val() || "docteur123";
    if (inputPwd === storedPwd) {
      localStorage.setItem("loggedMedecin", "true");
      return true;
    } else {
      return false;
    }
  });
}

// Déconnexion
export function logoutMedecin() {
  localStorage.removeItem("loggedMedecin");
}

// Changer mot de passe
export function changePassword(newPwd) {
  if (!newPwd || newPwd.trim() === "") throw new Error("Mot de passe invalide");
  return medRef.child("password").set(newPwd);
}

// Changer email
export function changeEmail(newEmail) {
  if (!newEmail || newEmail.trim() === "") throw new Error("Email invalide");
  return medRef.child("email").set(newEmail);
}

// Obtenir email actuel
export function getEmail() {
  return medRef.child("email").once("value").then(snapshot => snapshot.val());
}
