document.addEventListener("DOMContentLoaded", () => {
  const rdvTable = document.getElementById("rdvTable").querySelector("tbody");
  const remainingSpan = document.getElementById("remaining");

  function afficherRendezVous() {
    const ref = db.ref("rendezvous");
    ref.on("value", snapshot => {
      rdvTable.innerHTML = "";
      let remaining = 0;

      snapshot.forEach(child => {
        const data = child.val();
        if (!data.checked) remaining++;

        const tr = document.createElement("tr");
        tr.style.background = data.checked ? "#f28b82" : "white";
        tr.innerHTML = `
          <td>${data.numero}</td>
          <td>${data.nom}</td>
          <td>${data.tel}</td>
          <td>${data.date}</td>
          <td>
            <button class="btn-check" data-id="${child.key}" style="background:green; color:white;">✅</button>
            <button class="btn-delete" data-id="${child.key}" style="background:red; color:white;">🗑️</button>
          </td>
        `;
        rdvTable.appendChild(tr);
      });

      remainingSpan.textContent = remaining;

      document.querySelectorAll(".btn-check").forEach(btn => {
        btn.onclick = e => {
          const id = e.currentTarget.dataset.id;
          const refPatient = db.ref("rendezvous/" + id);
          refPatient.once("value").then(snap => {
            const current = snap.val().checked;
            refPatient.update({ checked: !current });
          });
        };
      });

      document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.onclick = e => {
          const id = e.currentTarget.dataset.id;
          db.ref("rendezvous/" + id).remove();
        };
      });
    });
  }

  afficherRendezVous();
});
