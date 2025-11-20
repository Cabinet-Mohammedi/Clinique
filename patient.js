document.addEventListener("DOMContentLoaded", () => {
  const btnReserve = document.getElementById("btnReserve");
  const nomPatient = document.getElementById("nomPatient");
  const telPatient = document.getElementById("telPatient");
  const infoReservation = document.getElementById("infoReservation");

  btnReserve.addEventListener("click", () => {
    const nom = nomPatient.value.trim();
    const tel = telPatient.value.trim();

    if (!nom || !tel) { alert("Veuillez remplir tous les champs !"); return; }

    const ref = db.ref("rendezvous");
    ref.once("value").then(snapshot => {
      const numero = snapshot.numChildren() + 1;
      const remaining = snapshot.forEach(child => !child.val().checked ? 1 : 0) || 0;

      ref.push({
        nom,
        tel,
        numero,
        date: new Date().toLocaleDateString("fr-FR"),
        checked: false
      });

      infoReservation.textContent = `Votre numéro: ${numero}, patients restants avant vous: ${remaining}`;
      nomPatient.value = "";
      telPatient.value = "";
    });
  });
});
