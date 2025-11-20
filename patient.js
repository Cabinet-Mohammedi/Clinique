const btnReserve = document.getElementById("btnReserve");
const infoReservation = document.getElementById("infoReservation");

btnReserve.addEventListener("click", () => {
  const nom = document.getElementById("nomPatient").value.trim();
  const tel = document.getElementById("telPatient").value.trim();

  if (!nom || !tel) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const refRdv = db.ref("rendezvous");
  refRdv.once("value").then(snapshot => {
    const total = snapshot.exists() ? snapshot.numChildren() : 0;
    const remaining = snapshot.exists() ? Object.values(snapshot.val()).filter(r => !r.checked).length : 0;
    const numero = total + 1;
    const date = new Date().toLocaleDateString("fr-FR");

    refRdv.push({ nom, tel, numero, date, checked: false });
    infoReservation.textContent = `Votre numéro: ${numero}. Patients restant avant vous: ${remaining}`;

    document.getElementById("nomPatient").value = "";
    document.getElementById("telPatient").value = "";
  });
});
