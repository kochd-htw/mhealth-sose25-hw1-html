document.addEventListener("DOMContentLoaded", () => {
    const medicationList = document.getElementById("medicationList");
    const medInput = document.getElementById("medInput");

    function loadMedications() {
        const storedMeds = JSON.parse(localStorage.getItem("medications")) || [];
        storedMeds.forEach(med => addMedication(med, false));
    }

    function addMedication(med, save = true) {
        if (!med) med = medInput.value.trim();
        if (!med) return;

        const li = document.createElement("li");
        const medText = document.createElement("span");
        medText.textContent = med;

        // 🔹 Bearbeiten-Button
        const editButton = document.createElement("button");
        editButton.textContent = "✏️";
        editButton.onclick = () => editMedication(medText);

        // 🔹 Löschen-Button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑";
        deleteButton.onclick = () => {
            li.remove();
            saveMedications();
        };

        li.appendChild(medText);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        medicationList.appendChild(li);

        if (save) saveMedications();
        medInput.value = "";
    }

    function editMedication(medText) {
        const newMed = prompt("Neues Medikament eingeben:", medText.textContent);
        if (newMed && newMed.trim()) {
            medText.textContent = newMed.trim();
            saveMedications();
        }
    }

    function saveMedications() {
        const meds = Array.from(document.querySelectorAll("#medicationList li span"))
                      .map(span => span.textContent.trim());

        localStorage.setItem("medications", JSON.stringify(meds));
    }

    window.addMedication = addMedication;
    loadMedications();
});
