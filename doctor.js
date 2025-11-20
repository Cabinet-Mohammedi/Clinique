// doctor.js
import { db, auth } from "./firebase.js";
import { ref, onValue, update, remove } from "firebase/database";
import { signInWithEmailAndPassword, updateEmail, updatePassword } from "firebase/auth";

document.addEventListener("DOMContentLoaded", () => {
  const rdvTable = document.getElementById("rdvTable").querySelector("tbody");
  const remainingSpan = document.getElementById("remaining");
  const btnProfile = document.querySelector("button");

  // Afficher rendez-vous
  const rendezRef = ref(db, "rendezvous");
  onValue(rendezRef, snapshot => {
    rdvTable.innerHTML = "";
    let remaining = 0;
    snapshot.forEach(child => {
      const data = child.val();
      if (!data.checked) remaining++;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${data.numero}</td>
        <td>${data.nom}</td>
        <td>${data.tel}</td>
        <td>${data.date}</td>
        <td>
          <button class="btn-check" data-id="${child.key}">✅</button>
          <button class="btn-delete" data-id="${child.key}">🗑️</button>
        </td>
      `;
      rdvTable.appendChild(tr);
    });
    remainingSpan.textContent = remaining;

    // toggle check
    rdvTable.querySelectorAll(".btn-check").forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const pRef = ref(db, "rendezvous/" + id);
        update(pRef, { checked: !snapshot.val()[id].checked });
      };
    });

    // delete
    rdvTable.querySelectorAll(".btn-delete").forEach(btn => {
      btn.onclick = () => remove(ref(db, "rendezvous/" + btn.dataset.id));
    });
  });

  // Modifier email / mot de passe
  btnProfile.onclick = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Vous devez être connecté !");
      return;
    }
    const newEmail = prompt("Nouvel Email:");
    if (newEmail) await updateEmail(user, newEmail).catch(e => alert(e.message));

    const newPwd = prompt("Nouvelle mot de passe:");
    if (newPwd) await updatePassword(user, newPwd).catch(e => alert(e.message));

    alert("Profil mis à jour !");
  };
});
