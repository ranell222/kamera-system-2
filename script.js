
localStorage.clear();
// 1. Just add more objects to this list
const defaultData = [
    { id: "KAM-UTLÅN-RES-01", serial: "1T0196" },
    { id: "KAM-UTLÅN-RES-02", serial: "IT0208" },
    { id: "KAM-UTLÅN-RES-03", serial: "IT0271" },
    { id: "KAM-UTLÅN-RES-04", serial: "IT0207" },
    { id: "KAM-UTLÅN-RES-05", serial: "IT0137" },
    { id: "KAM-UTLÅN-RES-06", serial: "85261838" },
    { id: "KAM-UTLÅN-RES-07", serial: "85261837" },
    { id: "KAM-UTLÅN-RES-##", serial: "########" },
];

let pcData = JSON.parse(localStorage.getItem('myInventoryData')) || defaultData;
let letSelectedIndex = -1; 

function renderList() {
    const listContainer = document.getElementById('pc-list');
    if (!listContainer) return;
    
    listContainer.innerHTML = ""; 
    
    pcData.forEach((pc, index) => {
        const div = document.createElement('div');
        div.className = 'pc-item';
        
        // SAFETY GUARD: If the ID is empty, show a placeholder so the box isn't blank
        div.innerText = pc.id && pc.id.trim() !== "" ? pc.id : `Kamera ${index + 1} (Navnløs)`; 
        
        div.onclick = () => {
            letSelectedIndex = index;
            // Update the display area
            document.getElementById('selected-id').innerText = pc.id || "Ingen tittel";
            document.getElementById('title-input').value = pc.id || "";
            document.getElementById('serial-input').value = pc.serial || "";
        };
        listContainer.appendChild(div);
    });
}

const saveButton = document.getElementById('save-btn');
if (saveButton) {
    saveButton.onclick = () => {
        if (letSelectedIndex !== -1) {
            // Take whatever is in the inputs and put it in our data array
            pcData[letSelectedIndex].id = document.getElementById('title-input').value;
            pcData[letSelectedIndex].serial = document.getElementById('serial-input').value;
            
            // Lock it into the browser's memory
            localStorage.setItem('myInventoryData', JSON.stringify(pcData));
            
            // Refresh the sidebar immediately
            renderList();
            alert("Endringer er lagret!");
        } else {
            alert("Vennligst velg et kamera fra listen først!");
        }
    };
}

renderList();