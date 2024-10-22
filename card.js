// Query selectors
const studentsContainer = document.getElementById('students-container');
const sortingCeremonyBtn = document.getElementById('sorting-ceremony-btn');
const voldemortArmyBtn = document.getElementById('voldemort-army-btn');
const sortingCeremonyElement = document.getElementById('sorting-ceremony');
const voldemortArmyElement = document.getElementById('voldemort-army');

// Import the students data from the data.js file
import { initialStudents } from './data.js';

// Function to create a card for each student
function createStudentCard(student) {
    // Create a new div element for the card
    const card = document.createElement('div');
    // Add Bootstrap classes for styling
    card.className = 'card mb-3';
    // Set maximum width for the card
    card.style.maxWidth = '540px';

    // Object to store the image paths for each house
    const houseImages = {
        Gryffindor: 'images/gryffindor-logo.png',
        Slytherin: 'images/slytherin-logo.png',
        Ravenclaw: 'images/ravenclaw-logo.png',
        Hufflepuff: 'images/hufflepuff-logo.png'
    };

    // Use template literals to create the HTML structure for the card
    card.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${houseImages[student.house]}" class="img-fluid rounded-start" alt="${student.house} crest">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${student.name}</h5>
                    <p class="card-text">House: ${student.house}</p>
                    <button class="btn btn-danger expel-btn">Expelliarmus</button>
                </div>
            </div>
        </div>
    `;

    // Find the expel button within the card
    const expelBtn = card.querySelector('.expel-btn');
    expelBtn.addEventListener('click', () => {
        // Remove the card when the expel button is clicked
        card.remove();
    });
    return card;
}

// Function to display all students
function displayStudents() {
    // Loop through each student in the imported students array
    initialStudents.forEach(student => {
        // Create a card for the current student
        const card = createStudentCard(student);
        // Append the card to the container
        studentsContainer.appendChild(card);
    });
}

// Add an event listener that calls displayStudents when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    displayStudents();
    setupThemeToggle();
});

// Function to setup theme toggle
function setupThemeToggle() {
    if (sortingCeremonyBtn) {
        sortingCeremonyBtn.addEventListener('click', showSortingCeremony);
    }

    if (voldemortArmyBtn) {
        voldemortArmyBtn.addEventListener('click', showVoldemortArmy);
    }
}

// Function to show Sorting Ceremony view
function showSortingCeremony() {
    document.body.classList.remove('voldemort-theme');
    toggleVisibility(sortingCeremonyElement, 'block');
    toggleVisibility(voldemortArmyElement, 'none');
}

// Function to show Voldemort's Army view
function showVoldemortArmy() {
    document.body.classList.add('voldemort-theme');
    toggleVisibility(sortingCeremonyElement, 'none');
    toggleVisibility(voldemortArmyElement, 'block');
}

// Helper function to toggle visibility
function toggleVisibility(element, displayStyle) {
    if (element) {
        element.style.display = displayStyle;
    }
}