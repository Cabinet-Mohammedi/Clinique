document.getElementById("btnChangePwd").addEventListener("click", () => {
  const currentPwd = localStorage.getItem("mdpMedecin") || "docteur123";
  const ancien = prompt("Entrer mot de passe actuel:");
  if (ancien !== currentPwd) { alert("Mot de passe incorrect"); return; }

  const nouveau = prompt("Entrer mot de passe nouveau:");
  if (!nouveau || nouveau.trim() === "") { alert("Mot de passe invalide"); return; }

  localStorage.setItem("mdpMedecin", nouveau);
  alert("Mot de passe changé avec succès !");
});

// Exemple pour email (en local storage, pas Firebase Auth)
document.getElementById("btnChangeEmail").addEventListener("click", () => {
  const email = prompt("Entrer nouveau email:");
  if (!email || email.trim() === "") { alert("Email invalide"); return; }
  localStorage.setItem("medecinEmail", email);
  alert("Email changé avec succès !");
});
