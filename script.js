// Import the students data from the data.js file
import students from './data.js';

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
    // Add a click event listener to the expel button
    expelBtn.addEventListener('click', () => {
        // Remove the card when the expel button is clicked
        card.remove();
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

// Function to show Sorting Ceremony view
function showSortingCeremony() {
    console.log("Showing Sorting Ceremony");
    document.body.classList.remove('voldemort-theme');
    console.log("Voldemort theme removed:", !document.body.classList.contains('voldemort-theme'));
    
    // Show Sorting Ceremony content
    document.getElementById('sorting-ceremony').style.display = 'block';
    document.getElementById('voldemort-army').style.display = 'none';
}

// Function to show Voldemort's Army view
function showVoldemortArmy() {
    console.log("Showing Voldemort's Army");
    document.body.classList.add('voldemort-theme');
    console.log("Voldemort theme added:", document.body.classList.contains('voldemort-theme'));
    
    // Show Voldemort's Army content
    document.getElementById('sorting-ceremony').style.display = 'none';
    document.getElementById('voldemort-army').style.display = 'block';
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    const sortingCeremonyBtn = document.getElementById('sorting-ceremony-btn');
    const voldemortArmyBtn = document.getElementById('voldemort-army-btn');
    
    if (sortingCeremonyBtn) {
        sortingCeremonyBtn.addEventListener('click', showSortingCeremony);
        console.log("Sorting Ceremony button listener added");
    } else {
        console.error("Sorting Ceremony button not found");
    }
    
    if (voldemortArmyBtn) {
        voldemortArmyBtn.addEventListener('click', showVoldemortArmy);
        console.log("Voldemort's Army button listener added");
    } else {
        console.error("Voldemort's Army button not found");
    }
});
