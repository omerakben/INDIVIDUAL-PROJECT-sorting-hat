// Import initial student data from data.js
import { initialStudents, initialVoldemortArmy } from './data.js';

// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select all necessary DOM elements and store them in variables for easy access
    const elements = {
        nameForm: document.getElementById('name-form'),
        sortingOptions: document.getElementById('sorting-options'),
        quizOption: document.getElementById('quiz-option'),
        randomOption: document.getElementById('random-option'),
        sortingForm: document.getElementById('sorting-form'),
        sortingQuiz: document.getElementById('sorting-quiz'),
        sortingResult: document.getElementById('sorting-result'),
        sortingContemplation: document.getElementById('sorting-contemplation'),
        finalDecision: document.getElementById('final-decision'),
        sortingControls: document.getElementById('sorting-controls'),
        sortAnotherBtn: document.getElementById('sort-another-student'),
        showHogwartsBtn: document.getElementById('show-hogwarts'),
        showVoldemortBtn: document.getElementById('show-voldemort'),
        displayToggle: document.getElementById('display-toggle'),
        nameInput: document.getElementById('name'),
        studentName: document.getElementById('student-name'),
        greeting: document.getElementById('greeting'),
        hogwartsContainer: document.getElementById('hogwarts-students-container'),
        voldemortContainer: document.getElementById('voldemort-army-container')
    };

    // Initialize variables to store state
    let state = {
        studentName: '',
        students: [...initialStudents],
        voldemortArmy: [...initialVoldemortArmy],
        isFirstSorting: true,
        currentPage: 'sorting-hat'
    };

    // Define house logos and colors for easy access and consistency
    const houseData = {
        gryffindor: { logo: 'images/gryffindor-logo.png', color: '#740001' },
        hufflepuff: { logo: 'images/hufflepuff-logo.png', color: '#ECB939' },
        ravenclaw: { logo: 'images/ravenclaw-logo.png', color: '#0E1A40' },
        slytherin: { logo: 'images/slytherin-logo.png', color: '#1A472A' }
    };

    // Prevent non-letter characters in the name input
    elements.nameInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
    });

    // Handle name form submission
    elements.nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        state.studentName = elements.nameInput.value.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        elements.studentName.textContent = state.studentName;
        elements.nameForm.style.display = 'none';
        elements.sortingOptions.style.display = 'block';
    });

    // Show sorting quiz when quiz option is clicked
    elements.quizOption.addEventListener('click', () => {
        elements.sortingOptions.style.display = 'none';
        elements.sortingForm.style.display = 'block';
    });

    // Handle random sorting when random option is clicked
    elements.randomOption.addEventListener('click', () => {
        const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
        const randomHouse = houses[Math.floor(Math.random() * houses.length)];
        showSortingResult(randomHouse.toLowerCase());
    });

    // Handle sorting quiz submission
    elements.sortingQuiz.addEventListener('submit', (e) => {
        e.preventDefault();
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
        const houseScores = Object.values(answers).reduce((scores, answer) => {
            scores[answer] = (scores[answer] || 0) + 1;
            return scores;
        }, {});
        return Object.keys(houseScores).reduce((a, b) => houseScores[a] > houseScores[b] ? a : b);
    }

    // Display sorting result
    function showSortingResult(house) {
        elements.sortingOptions.style.display = 'none';
        elements.sortingForm.style.display = 'none';
        elements.sortingResult.style.display = 'block';

        elements.sortingContemplation.innerHTML = `<h4>Hmm, let me see... ${state.studentName}, The Sorting Hat is deep in thought..., Where Shall I Put You?...</h4>`;
        setTimeout(() => {
            const capitalizedHouse = house.charAt(0).toUpperCase() + house.slice(1);
            elements.finalDecision.innerHTML = `
                ${state.studentName}, you belong to ${capitalizedHouse}!<br>
                <img src="${houseData[house].logo}" alt="${capitalizedHouse} logo" class="house-logo" style="display: block; margin: 20px auto;">
            `;
            
            if (!studentExists(state.studentName)) {
                createNewStudent(state.studentName, capitalizedHouse);
            } else {
                elements.finalDecision.innerHTML += '<p>You already have a house!</p>';
            }

            elements.sortAnotherBtn.style.display = 'inline-block';

            setTimeout(() => showPage('hogwarts-students'), 1000);
        }, 1000);
    }

    // Check if a student already exists in the students array
    const studentExists = name => state.students.some(student => student.name.toLowerCase() === name.toLowerCase());

    // Create a new student and add to the students array
    const createNewStudent = (name, house) => state.students.push({ name, house });

    // Create a student card (for both Hogwarts and Voldemort's Army)
    function createStudentCard(student, isVoldemortArmy = false) {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';

        const houseColor = isVoldemortArmy ? '#000000' : houseData[student.house.toLowerCase()].color;
        const logo = isVoldemortArmy ? 'images/voldemort-logo.png' : houseData[student.house.toLowerCase()].logo;

        const buttonText = isVoldemortArmy ? 'Reparo' : 'Expelliarmus';
        const buttonClass = isVoldemortArmy ? 'recruit-btn' : 'expel-btn';

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

        card.querySelector(`.${buttonClass}`).addEventListener('click', () => {
            isVoldemortArmy ? recruitStudent(student) : expelStudent(student);
        });

        return card;
    }

    // Expel a student (move from Hogwarts to Voldemort's Army)
    function expelStudent(student) {
        state.students = state.students.filter(s => s.name !== student.name);
        if (!state.voldemortArmy.some(s => s.name === student.name)) {
            state.voldemortArmy.push(student);
        }
        updateDisplay();
    }

    // Recruit a student back to Hogwarts
    function recruitStudent(student) {
        if (!state.students.some(s => s.name === student.name)) {
            state.voldemortArmy = state.voldemortArmy.filter(s => s.name !== student.name);
            state.students.push(student);
            updateDisplay();
        }
    }

    // Update the display after expelling or recruiting
    function updateDisplay() {
        if (state.currentPage === 'hogwarts-students') {
            displayAllStudents();
        } else if (state.currentPage === 'voldemort-army') {
            displayVoldemortArmy();
        }
        
        elements.hogwartsContainer.innerHTML = '';
        elements.voldemortContainer.innerHTML = '';
        displayAllStudents();
        displayVoldemortArmy();
    }

    // Display all Hogwarts students
    function displayAllStudents() {
        elements.hogwartsContainer.innerHTML = `
            <h2 class="text-center mb-4">Hogwarts Students</h2>
            <div class="text-center mb-3">
                <button id="sort-hogwarts-by-name" class="btn btn-secondary me-2">Order by Name</button>
                <button id="sort-hogwarts-by-house" class="btn btn-secondary me-2">Order by House</button>
                <button id="sort-another-student-hogwarts" class="btn btn-primary">Sorting Ceremony!</button>
            </div>
            <div class="row"></div>
        `;
        const row = elements.hogwartsContainer.querySelector('.row');
        state.students.forEach(student => row.appendChild(createStudentCard(student)));

        document.getElementById('sort-hogwarts-by-name').addEventListener('click', () => sortStudents('name'));
        document.getElementById('sort-hogwarts-by-house').addEventListener('click', () => sortStudents('house'));
        document.getElementById('sort-another-student-hogwarts').addEventListener('click', resetSorting);
    }

    // Display Voldemort's Army
    function displayVoldemortArmy() {
        elements.voldemortContainer.innerHTML = `
            <h2 class="text-center mb-4">Voldemort's Army</h2>
            <div class="text-center mb-3">
                <button id="sort-army-by-name" class="btn btn-secondary me-2">Order by Name</button>
            </div>
            <div class="row"></div>
        `;
        const row = elements.voldemortContainer.querySelector('.row');
        state.voldemortArmy.forEach(student => row.appendChild(createStudentCard(student, true)));

        document.getElementById('sort-army-by-name').addEventListener('click', () => sortVoldemortArmy('name'));
    }

    // Sort Voldemort's Army by name
    const sortVoldemortArmy = criteria => {
        state.voldemortArmy.sort((a, b) => a[criteria].toLowerCase().localeCompare(b[criteria].toLowerCase()));
        displayVoldemortArmy();
    };

    // Sort Hogwarts students by name or house
    const sortStudents = criteria => {
        state.students.sort((a, b) => a[criteria].toLowerCase().localeCompare(b[criteria].toLowerCase()));
        displayAllStudents();
    };

    // Add event listener for "Sort Another Student" button
    elements.sortAnotherBtn.addEventListener('click', resetSorting);

    // Reset the sorting process
    function resetSorting() {
        elements.nameForm.style.display = 'block';
        elements.sortingOptions.style.display = 'none';
        elements.sortingForm.style.display = 'none';
        elements.sortingResult.style.display = 'none';
        
        elements.nameInput.value = '';
        state.studentName = '';
        
        elements.hogwartsContainer.style.display = 'none';
        elements.voldemortContainer.style.display = 'none';
        
        showPage('sorting-hat');
        
        document.body.style.backgroundImage = 'url("images/hogwarts-logo.png")';
        
        window.scrollTo(0, 0);
        
        state.isFirstSorting = true;
        
        elements.greeting.style.display = 'block';
    }

    // Add event listeners for display toggle buttons
    elements.showHogwartsBtn.addEventListener('click', () => showDisplay('hogwarts'));
    elements.showVoldemortBtn.addEventListener('click', () => showDisplay('voldemort'));

    // Show either Hogwarts Students or Voldemort's Army
    function showDisplay(type) {
        if (type === 'hogwarts') {
            elements.hogwartsContainer.style.display = 'block';
            elements.voldemortContainer.style.display = 'none';
            document.body.classList.remove('voldemort-theme');
            displayAllStudents();
        } else {
            elements.hogwartsContainer.style.display = 'none';
            elements.voldemortContainer.style.display = 'block';
            document.body.classList.add('voldemort-theme');
            displayVoldemortArmy();
        }
    }

    // Show a specific page (sorting hat, Hogwarts students, or Voldemort's Army)
    function showPage(pageName) {
        document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
        document.getElementById(`${pageName}-page`).style.display = 'block';
        state.currentPage = pageName;
        
        if (pageName === 'sorting-hat') {
            elements.sortingControls.style.display = 'none';
            elements.displayToggle.style.display = 'none';
            elements.nameForm.style.display = 'block';
            elements.greeting.style.display = 'block';
        } else if (pageName === 'hogwarts-students') {
            elements.sortingControls.style.display = 'none';
            elements.displayToggle.style.display = 'block';
            displayAllStudents();
        } else if (pageName === 'voldemort-army') {
            elements.sortingControls.style.display = 'none';
            elements.displayToggle.style.display = 'block';
            displayVoldemortArmy();
        }
    }

    // Initialize the app by showing the sorting hat page
    showPage('sorting-hat');
});
