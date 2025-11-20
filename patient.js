// patient.js
import { db } from "./firebase.js";
import { ref, push, get, child } from "firebase/database";

document.addEventListener("DOMContentLoaded", () => {
  const nomInput = document.getElementById("nomPatient");
  const telInput = document.getElementById("telPatient");
  const btnReserve = document.getElementById("btnReserve");
  const info = document.getElementById("infoReservation");

  btnReserve.addEventListener("click", async () => {
    const nom = nomInput.value.trim();
    const tel = telInput.value.trim();
    if (!nom || !tel) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const rendezRef = ref(db, "rendezvous");
    const snapshot = await get(rendezRef);
    const numero = snapshot.exists() ? Object.keys(snapshot.val()).length + 1 : 1;

    await push(rendezRef, {
      nom,
      tel,
      numero,
      date: new Date().toLocaleDateString("fr-FR"),
      checked: false
    });

    // حساب المتبقين
    let remaining = 0;
    if (snapshot.exists()) {
      const data = snapshot.val();
      remaining = Object.values(data).filter(p => !p.checked).length;
    }

    info.textContent = `✅ Votre numéro: ${numero}, Patients restant: ${remaining}`;
    nomInput.value = "";
    telInput.value = "";
  });
});
