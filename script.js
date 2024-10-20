// Import the students data from the data.js file
import students from './data.js';

// Object to store house descriptions for hints
const houseHints = {
    Gryffindor: "Home to the brave and chivalrous. Gryffindors are known for their courage, daring, and determination.",
    Hufflepuff: "Values hard work, patience, loyalty, and fair play. Hufflepuffs are known for their dedication and kindness.",
    Ravenclaw: "Where those of wit and learning will always find their kind. Ravenclaws are known for their intelligence and creativity.",
    Slytherin: "Cunning folk use any means to achieve their ends. Slytherins are known for their ambition, cleverness, and resourcefulness."
};

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
                    <button class="btn btn-danger expel-btn">Expel</button>
                    <button class="btn btn-info hint-btn mt-2">House Hint</button>
                    <p class="card-text house-hint mt-2" style="display: none;"></p>
                </div>
            </div>
        </div>
    `;

    // Find the expel button within the card
    const expelBtn = card.querySelector('.expel-btn');
    // Add a click event listener to the expel button
    expelBtn.addEventListener('click', () => {
        // Remove the card when the expel button is clicked
        card.remove();
    });

    // Find the hint button within the card
    const hintBtn = card.querySelector('.hint-btn');
    const hintText = card.querySelector('.house-hint');
    // Add a click event listener to the hint button
    hintBtn.addEventListener('click', () => {
        // Toggle the visibility of the hint text
        if (hintText.style.display === 'none') {
            hintText.textContent = houseHints[student.house];
            hintText.style.display = 'block';
            hintBtn.textContent = 'Hide Hint';
        } else {
            hintText.style.display = 'none';
            hintBtn.textContent = 'House Hint';
        }
    });

    // Return the completed card element
    return card;
}

// Function to display all students
function displayStudents() {
    // Find the container element where student cards will be appended
    const container = document.getElementById('students-container');
    // Loop through each student in the imported students array
    students.forEach(student => {
        // Create a card for the current student
        const card = createStudentCard(student);
        // Append the card to the container
        container.appendChild(card);
    });
}

// Add an event listener that calls displayStudents when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', displayStudents);
