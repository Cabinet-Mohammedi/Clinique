document.addEventListener("DOMContentLoaded", () => {
    const rdvTable = document.getElementById("rdvTable").querySelector("tbody");
    const remainingSpan = document.getElementById("remaining");

    const db = firebase.database();

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
                        <button class="btn-check" data-id="${child.key}" style="background:green; color:white; margin-right:5px;">✅</button>
                        <button class="btn-delete" data-id="${child.key}" style="background:red; color:white;">🗑️</button>
                    </td>
                `;
                rdvTable.appendChild(tr);
            });

            remainingSpan.textContent = remaining;

            // Toggle rendez-vous
            document.querySelectorAll(".btn-check").forEach(btn => {
                btn.addEventListener("click", e => {
                    const id = e.currentTarget.dataset.id;
                    db.ref("rendezvous/" + id).once("value").then(snap => {
                        const current = snap.val().checked;
                        db.ref("rendezvous/" + id).update({ checked: !current });
                    });
                });
            });

            // Supprimer rendez-vous
            document.querySelectorAll(".btn-delete").forEach(btn => {
                btn.addEventListener("click", e => {
                    const id = e.currentTarget.dataset.id;
                    db.ref("rendezvous/" + id).remove();
                });
            });
        });
    }

    afficherRendezVous();
});
