const MedApp = (() => {
    const medicationList = document.getElementById("medicationList");
    const medInput = document.getElementById("medInput");

    function loadMedications() {
        const storedMeds = JSON.parse(localStorage.getItem("medications")) || [];
        console.log("Geladene Medikamente aus localStorage:", storedMeds); // Debugging-Log
        storedMeds.forEach(med => addMedication(med, false));
    }

    function addMedication(med, save = true) {
        if (!med) med = medInput.value.trim();
        if (!med) return;

        console.log("Medikament wird hinzugefügt:", med);

        const li = document.createElement("li");
        const medText = document.createElement("span");
        medText.textContent = med;

        const editButton = document.createElement("button");
        editButton.textContent = "✏️";
        editButton.onclick = () => {
            console.log("Medikament wird bearbeitet:", medText.textContent);
            editMedication(medText);
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑";
        deleteButton.onclick = () => {
            console.log("Medikament wird gelöscht:", medText.textContent);
            li.remove();
            saveMedications();
        };

        li.appendChild(medText);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        medicationList.appendChild(li);

        if (save) {
            console.log("Speichere Medikamentenliste...");
            saveMedications();
        }

        addVisibleElement();
        medInput.value = "";
    }

    function editMedication(medText) {
        const newMed = prompt("Neues Medikament eingeben:", medText.textContent);
        if (newMed && newMed.trim()) {
            console.log("Neuer Medikamentenname:", newMed);
            medText.textContent = newMed.trim();
            saveMedications();
        }
    }

    function saveMedications() {
        const meds = Array.from(document.querySelectorAll("#medicationList li span"))
                          .map(span => span.textContent.trim());

        console.log("Aktualisierte Medikamentenliste:", meds);
        localStorage.setItem("medications", JSON.stringify(meds));
    }

    function addVisibleElement() {
        console.log("Zeige Bestätigungsnachricht für Medikamenten-Hinzufügung.");
        const newElement = document.createElement("div");
        newElement.textContent = "Medikament hinzugefügt!";
        newElement.classList.add("message");

        document.body.appendChild(newElement);

        setTimeout(() => {
            console.log("Bestätigungsnachricht wird entfernt.");
            newElement.style.opacity = "0";
            setTimeout(() => newElement.remove(), 500);
        }, 3000);
    }

    return {
        addMedication,
        loadMedications
    };
})();

document.getElementById("addMedButton").addEventListener("click", () => {
    console.log("Button wurde geklickt! Starte Medikamenten-Hinzufügung...");
    MedApp.addMedication();
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Seite geladen! Starte Medikamenten-Initialisierung...");
    MedApp.loadMedications();
});
