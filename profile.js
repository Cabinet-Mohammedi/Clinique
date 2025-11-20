document.getElementById("btnChangePwd").onclick = () => {
  const currentPwd = prompt("Entrez le mot de passe actuel:");
  const newPwd = prompt("Entrez le nouveau mot de passe:");
  if (!newPwd) return alert("Mot de passe invalide");

  // Stockage temporaire dans Firebase pour exemple (utilisez Firebase Auth pour sécurité réelle)
  db.ref("medecin/password").set(newPwd)
    .then(() => alert("Mot de passe changé !"))
    .catch(err => alert("Erreur: " + err.message));
};

document.getElementById("btnChangeEmail").onclick = () => {
  const newEmail = prompt("Entrez le nouvel email:");
  if (!newEmail) return alert("Email invalide");

  db.ref("medecin/email").set(newEmail)
    .then(() => alert("Email changé !"))
    .catch(err => alert("Erreur: " + err.message));
};
