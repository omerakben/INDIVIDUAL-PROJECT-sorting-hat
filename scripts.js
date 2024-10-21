// Import initial student data from data.js
import { initialStudents, initialVoldemortArmy } from './data.js';

// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select all necessary DOM elements and store them in variables for easy access
    // This helps avoid repeated DOM queries and improves performance
    const nameForm = document.getElementById('name-form');
    const sortingOptions = document.getElementById('sorting-options');
    const quizOption = document.getElementById('quiz-option');
    const randomOption = document.getElementById('random-option');
    const sortingForm = document.getElementById('sorting-form');
    const sortingQuiz = document.getElementById('sorting-quiz');
    const sortingResult = document.getElementById('sorting-result');
    const sortingContemplation = document.getElementById('sorting-contemplation');
    const finalDecision = document.getElementById('final-decision');
    const sortingControls = document.getElementById('sorting-controls');
    const sortByNameBtn = document.getElementById('sort-by-name');
    const sortByHouseBtn = document.getElementById('sort-by-house');
    const sortAnotherBtn = document.getElementById('sort-another-student');
    const showHogwartsBtn = document.getElementById('show-hogwarts');
    const showVoldemortBtn = document.getElementById('show-voldemort');
    const displayToggle = document.getElementById('display-toggle');

    // Initialize variables to store state
    let studentName = ''; // Will store the current student's name
    let students = [...initialStudents]; // Create a copy of the initial students array using spread operator
    let voldemortArmy = [...initialVoldemortArmy]; // Create a copy of the initial Voldemort's army array
    let isFirstSorting = true; // Flag to check if it's the first time sorting
    let currentPage = 'sorting-hat'; // Keeps track of the current page being displayed

    // Define house logos and colors for easy access and consistency
    // Using objects to store related data
    const houseLogos = {
        gryffindor: 'images/gryffindor-logo.png',
        hufflepuff: 'images/hufflepuff-logo.png',
        ravenclaw: 'images/ravenclaw-logo.png',
        slytherin: 'images/slytherin-logo.png'
    };

    const houseColors = {
        gryffindor: '#740001',
        hufflepuff: '#ECB939',
        ravenclaw: '#0E1A40',
        slytherin: '#1A472A'
    };

    // Get the name input element
    const nameInput = document.getElementById('name');

    // Prevent non-letter characters in the name input
    // This event listener runs every time the input changes
    nameInput.addEventListener('input', function() {
        // Replace any character that is not a letter or space with an empty string
        // This uses a regular expression to match non-letter and non-space characters
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
    });

    // Handle name form submission
    nameForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the form from submitting normally
        let inputName = document.getElementById('name').value;
        
        // Capitalize each word in the name
        // This splits the name into words, capitalizes each word, then joins them back
        studentName = inputName.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        document.getElementById('student-name').textContent = studentName;
        nameForm.style.display = 'none';
        sortingOptions.style.display = 'block';
    });

    // Show sorting quiz when quiz option is clicked
    quizOption.addEventListener('click', () => {
        sortingOptions.style.display = 'none';
        sortingForm.style.display = 'block';
    });

    // Handle random sorting when random option is clicked
    randomOption.addEventListener('click', () => {
        const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
        // Randomly select a house
        const randomHouse = houses[Math.floor(Math.random() * houses.length)];
        showSortingResult(randomHouse.toLowerCase());
    });

    // Handle sorting quiz submission
    sortingQuiz.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the form from submitting normally
        // Collect answers from the quiz
        const answers = {
            challengeReaction: document.getElementById('challenge-reaction').value,
            importantValue: document.getElementById('important-value').value,
            groupRole: document.getElementById('group-role').value
        };
        const sortedHouse = determineHouse(answers);
        showSortingResult(sortedHouse);
    });

    // Determine house based on quiz answers
    function determineHouse(answers) {
        const houseScores = {
            gryffindor: 0,
            hufflepuff: 0,
            ravenclaw: 0,
            slytherin: 0
        };

        // Count the number of answers for each house
        for (const answer of Object.values(answers)) {
            houseScores[answer]++;
        }

        // Return the house with the highest score
        // This uses reduce to find the house with the maximum score
        return Object.keys(houseScores).reduce((a, b) => houseScores[a] > houseScores[b] ? a : b);
    }

    // Display sorting result
    function showSortingResult(house) {
        sortingOptions.style.display = 'none';
        sortingForm.style.display = 'none';
        sortingResult.style.display = 'block';

        sortingContemplation.innerHTML = `<h4>Hmm, let me see... ${studentName}, The Sorting Hat is deep in thought..., Where Shall I Put You?...</h4>`;
        setTimeout(() => {
            const capitalizedHouse = house.charAt(0).toUpperCase() + house.slice(1);
            finalDecision.innerHTML = `
                ${studentName}, you belong to ${capitalizedHouse}!<br>
                <img src="${houseLogos[house]}" alt="${capitalizedHouse} logo" class="house-logo" style="display: block; margin: 20px auto;">
            `;
            
            if (!studentExists(studentName)) {
                createNewStudent(studentName, capitalizedHouse);
            } else {
                finalDecision.innerHTML += '<p>You already have a house!</p>';
            }

            // Show the "Sort Another Student" button
            sortAnotherBtn.style.display = 'inline-block';

            // Use another setTimeout to delay showing the Hogwarts Students page
            setTimeout(() => {
                showPage('hogwarts-students');
            }, 1000);
        }, 1000);
    }

    // Check if a student already exists in the students array
    function studentExists(name) {
        // Use Array.some() to check if any student in the array has the given name
        return students.some(student => student.name.toLowerCase() === name.toLowerCase());
    }

    // Create a new student and add to the students array
    function createNewStudent(name, house) {
        const newStudent = { name, house };
        students.push(newStudent);
    }

    // Create a student card (for both Hogwarts and Voldemort's Army)
    function createStudentCard(student, isVoldemortArmy = false) {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';

        const houseColor = isVoldemortArmy ? '#000000' : houseColors[student.house.toLowerCase()];
        const logo = isVoldemortArmy ? 'images/voldemort-logo.png' : houseLogos[student.house.toLowerCase()];

        const buttonText = isVoldemortArmy ? 'Reparo' : 'Expelliarmus';
        const buttonClass = isVoldemortArmy ? 'recruit-btn' : 'expel-btn';

        // Create card HTML using template literals
        // This allows for easy insertion of variables into the HTML string
        card.innerHTML = `
            <div class="card h-100" style="background-color: ${houseColor}40;">
                <div class="row g-0">
                    <div class="col-md-4 d-flex align-items-center justify-content-center">
                        <img src="${logo}" class="img-fluid rounded-start house-crest" alt="${isVoldemortArmy ? 'Voldemort' : student.house} crest">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${student.name}</h5>
                            <p class="card-text">${isVoldemortArmy ? 'Voldemort\'s Army' : 'House: ' + student.house}</p>
                            <button class="btn btn-danger ${buttonClass}">${buttonText}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listener to the expel/recruit button
        const actionBtn = card.querySelector(`.${buttonClass}`);
        actionBtn.addEventListener('click', () => {
            if (isVoldemortArmy) {
                recruitStudent(student);
            } else {
                expelStudent(student);
            }
        });

        return card;
    }

    // Expel a student (move from Hogwarts to Voldemort's Army)
    function expelStudent(student) {
        // Remove student from Hogwarts
        students = students.filter(s => s.name !== student.name);
        // Add student to Voldemort's Army if not already there
        if (!voldemortArmy.some(s => s.name === student.name)) {
            voldemortArmy.push(student);
        }
        updateDisplay();
    }

    // Recruit a student back to Hogwarts
    function recruitStudent(student) {
        // Check if the student is already in Hogwarts
        if (!students.some(s => s.name === student.name)) {
            // Remove from Voldemort's Army
            voldemortArmy = voldemortArmy.filter(s => s.name !== student.name);
            // Add to Hogwarts
            students.push(student);
            updateDisplay();
        }
    }

    // Update the display after expelling or recruiting
    function updateDisplay() {
        if (currentPage === 'hogwarts-students') {
            displayAllStudents();
        } else if (currentPage === 'voldemort-army') {
            displayVoldemortArmy();
        }
        
        // Always update both containers to ensure consistency
        document.getElementById('hogwarts-students-container').innerHTML = '';
        document.getElementById('voldemort-army-container').innerHTML = '';
        displayAllStudents();
        displayVoldemortArmy();
    }

    // Display all Hogwarts students
    function displayAllStudents() {
        const container = document.getElementById('hogwarts-students-container');
        container.innerHTML = `
            <h2 class="text-center mb-4">Hogwarts Students</h2>
            <div class="text-center mb-3">
                <button id="sort-hogwarts-by-name" class="btn btn-secondary me-2">Order by Name</button>
                <button id="sort-hogwarts-by-house" class="btn btn-secondary me-2">Order by House</button>
                <button id="sort-another-student-hogwarts" class="btn btn-primary">Sorting Ceremony!</button>
            </div>
            <div class="row"></div>
        `;
        const row = container.querySelector('.row');
        students.forEach(student => {
            const card = createStudentCard(student);
            row.appendChild(card);
        });

        // Add event listeners for sorting buttons
        document.getElementById('sort-hogwarts-by-name').addEventListener('click', () => sortStudents('name'));
        document.getElementById('sort-hogwarts-by-house').addEventListener('click', () => sortStudents('house'));
        document.getElementById('sort-another-student-hogwarts').addEventListener('click', resetSorting);
    }

    // Display Voldemort's Army
    function displayVoldemortArmy() {
        const container = document.getElementById('voldemort-army-container');
        container.innerHTML = `
            <h2 class="text-center mb-4">Voldemort's Army</h2>
            <div class="text-center mb-3">
                <button id="sort-army-by-name" class="btn btn-secondary me-2">Order by Name</button>
            </div>
            <div class="row"></div>
        `;
        const row = container.querySelector('.row');
        voldemortArmy.forEach(student => {
            const card = createStudentCard(student, true);
            row.appendChild(card);
        });

        // Add event listeners for sorting button and Sorting Ceremony
        document.getElementById('sort-army-by-name').addEventListener('click', () => sortVoldemortArmy('name'));
    }

    // Sort Voldemort's Army by name
    function sortVoldemortArmy(criteria) {
        voldemortArmy.sort((a, b) => {
            if (a[criteria].toLowerCase() < b[criteria].toLowerCase()) return -1;
            if (a[criteria].toLowerCase() > b[criteria].toLowerCase()) return 1;
            return 0;
        });
        displayVoldemortArmy();
    }

    // Sort Hogwarts students by name or house
    function sortStudents(criteria) {
        students.sort((a, b) => {
            if (a[criteria].toLowerCase() < b[criteria].toLowerCase()) return -1;
            if (a[criteria].toLowerCase() > b[criteria].toLowerCase()) return 1;
            return 0;
        });
        displayAllStudents();
    }

    // Add event listener for "Sort Another Student" button
    sortAnotherBtn.addEventListener('click', resetSorting);

    // Reset the sorting process
    function resetSorting() {
        // Reset all relevant elements to their initial state
        nameForm.style.display = 'block';
        sortingOptions.style.display = 'none';
        sortingForm.style.display = 'none';
        sortingResult.style.display = 'none';
        
        // Clear the name input
        document.getElementById('name').value = '';
        
        // Reset the studentName variable
        studentName = '';
        
        // Hide Hogwarts Students and Voldemort's Army containers
        document.getElementById('hogwarts-students-container').style.display = 'none';
        document.getElementById('voldemort-army-container').style.display = 'none';
        
        // Show the Sorting Hat page
        showPage('sorting-hat');
        
        // Set the background image to Hogwarts logo
        document.body.style.backgroundImage = 'url("images/hogwarts-logo.png")';
        
        // Optionally, scroll to the top of the page
        window.scrollTo(0, 0);
        
        // Reset isFirstSorting flag
        isFirstSorting = true;
        
        // Show the greeting
        document.getElementById('greeting').style.display = 'block';
    }

    // Add event listeners for display toggle buttons
    showHogwartsBtn.addEventListener('click', () => showDisplay('hogwarts'));
    showVoldemortBtn.addEventListener('click', () => showDisplay('voldemort'));

    // Show either Hogwarts Students or Voldemort's Army
    function showDisplay(type) {
        if (type === 'hogwarts') {
            document.getElementById('hogwarts-students-container').style.display = 'block';
            document.getElementById('voldemort-army-container').style.display = 'none';
            document.body.classList.remove('voldemort-theme');
            displayAllStudents();
        } else {
            document.getElementById('hogwarts-students-container').style.display = 'none';
            document.getElementById('voldemort-army-container').style.display = 'block';
            document.body.classList.add('voldemort-theme');
            displayVoldemortArmy();
        }
    }

    // Show a specific page (sorting hat, Hogwarts students, or Voldemort's Army)
    function showPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
        // Show the selected page
        document.getElementById(`${pageName}-page`).style.display = 'block';
        currentPage = pageName;
        
        // Update UI elements based on the current page
        if (pageName === 'sorting-hat') {
            sortingControls.style.display = 'none';
            displayToggle.style.display = 'none';
            nameForm.style.display = 'block';
            document.getElementById('greeting').style.display = 'block';
        } else if (pageName === 'hogwarts-students') {
            sortingControls.style.display = 'none'; // Hide top-level sorting controls
            displayToggle.style.display = 'block';
            displayAllStudents();
        } else if (pageName === 'voldemort-army') {
            sortingControls.style.display = 'none'; // Hide top-level sorting controls
            displayToggle.style.display = 'block';
            displayVoldemortArmy();
        }
    }

    // Initialize the app by showing the sorting hat page
    showPage('sorting-hat');
});
