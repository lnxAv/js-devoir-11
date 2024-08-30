// Elements
const helpElement = document.getElementById("help");
const moisElement = document.getElementById("mois");
const joursElement = document.getElementById("jours");
const submitElement = document.getElementById("submit");
const cardElement = document.getElementById("card");

// Enums
const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai',, 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

const ENGLISH_MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// Message Functions

function infoMessage(message) {
    helpElement.className = 'alert alert-info';
    helpElement.textContent = message;
}

function warningMessage(message) {
    helpElement.className = 'alert alert-warning';
    helpElement.textContent = message;
}

function errorMessage(message) {
    helpElement.className = 'alert alert-danger';
    helpElement.textContent = message;
}

function successMessage(message) {
    helpElement.className = 'alert alert-success';
    helpElement.textContent = message;
}

function clearMessage() {
    helpElement.className = 'alert alert-info';
    helpElement.textContent = '';
}

// Event Functions
function handleMoisChange() {
    let moisValue = moisElement.value;
    if (!moisValue) return ""; // ignore if empty
    moisValue = moisValue.toLowerCase();
    const regex = new RegExp(`^${moisValue}`);
    const filterMonths = MONTHS.filter( month => regex.test(month) );
    let finalResult = '';
    // if there is more then one match, find the common letters
    if(filterMonths.length > 1) {
        let charIndex = moisValue.length;
        let wordIndex = 0;
        finalResult = moisValue;
        let comparison = filterMonths[0].charAt(charIndex);
        // grab the first letter and compare it to the rest 
        // if it's the same, add it to the result then move to the next letter
        while ( comparison === filterMonths[wordIndex].charAt(charIndex) ) {
            wordIndex = (wordIndex + 1) % filterMonths.length;
            if( wordIndex === 0 ) {
                charIndex++;
                finalResult += comparison;
                comparison = filterMonths[wordIndex].charAt(charIndex);
            }
        }
        // warn multiple matches
        warningMessage('Correspondances trouvées ' + filterMonths.join(', '));
    }else if(filterMonths.length === 1) {
        // if there is only one match, return it
        finalResult = filterMonths[0];
        infoMessage('Mois trouvé, selectionné le jours');
        // focus on the input
        moisElement.blur();
    } else {
        // warning months not found
        errorMessage('Mois non trouvés');
    }

    // update the input
    moisElement.value = finalResult;
    // update Jours
    fillJours();
}

function fillJours() {
    if(MONTHS.find(mois => mois === moisElement.value)){
        const year = new Date().getFullYear();
        const month = MONTHS.indexOf(moisElement.value)+1;
        const daysInMonth = new Date(year, month, 0);
        // fill the select with the days
        for(let i = 1; i <= daysInMonth.getDate(); i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            joursElement.appendChild(option);
        }
        // select the first day
        joursElement.value = 1;
        // enable the input
        joursElement.disabled = false;
        joursElement.classList.remove('disabled');
    }
    else {
        // disable the input
        joursElement.value = '';
        joursElement.disabled = true;
        joursElement.classList.add('disabled');
    }

}

function handleSubmit() {
    if( moisElement.value && joursElement.value) {
        successMessage('OK');
        window.alert('submit form')
    }else {
        errorMessage('Veuillez remplir les champs');
    }
}

function handleRightClick() {
    errorMessage('right click, non permis sur ce bouton');
}

function handlePointerEnter(event) {
    const id = event.target.id;
    if(id === 'mois') {
        infoMessage('Tapez le mois');
    }else if(id === 'jours') {
        infoMessage('sélectionnez le jour');
    }
    else if (id === 'submit') {
        infoMessage('soumettre le formulaire');
    }
}
// Assign events
moisElement.addEventListener("change", handleMoisChange);
moisElement.addEventListener('pointerenter', handlePointerEnter);
joursElement.addEventListener('pointerenter', handlePointerEnter);
submitElement.addEventListener("click", handleSubmit);
submitElement.addEventListener("pointerenter", handlePointerEnter);
submitElement.addEventListener("contextmenu", handleRightClick);


fillJours();