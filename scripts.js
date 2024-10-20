import initialStudents from './data.js';

document.addEventListener('DOMContentLoaded', () => {
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

    let studentName = '';
    let students = [...initialStudents]; // Initialize with existing students
    let isFirstSorting = true;

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

    nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        studentName = document.getElementById('name').value;
        document.getElementById('student-name').textContent = studentName;
        nameForm.style.display = 'none';
        sortingOptions.style.display = 'block';
    });

    quizOption.addEventListener('click', () => {
        sortingOptions.style.display = 'none';
        sortingForm.style.display = 'block';
    });

    randomOption.addEventListener('click', () => {
        const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
        const randomHouse = houses[Math.floor(Math.random() * houses.length)];
        showSortingResult(randomHouse.toLowerCase());
    });

    sortingQuiz.addEventListener('submit', (e) => {
        e.preventDefault();
        const answers = {
            challengeReaction: document.getElementById('challenge-reaction').value,
            importantValue: document.getElementById('important-value').value,
            groupRole: document.getElementById('group-role').value
        };
        const sortedHouse = determineHouse(answers);
        showSortingResult(sortedHouse);
    });

    function determineHouse(answers) {
        const houseScores = {
            gryffindor: 0,
            hufflepuff: 0,
            ravenclaw: 0,
            slytherin: 0
        };

        for (const answer of Object.values(answers)) {
            houseScores[answer]++;
        }

        return Object.keys(houseScores).reduce((a, b) => houseScores[a] > houseScores[b] ? a : b);
    }

    function showSortingResult(house) {
        sortingOptions.style.display = 'none';
        sortingForm.style.display = 'none';
        sortingResult.style.display = 'block';

        sortingContemplation.textContent = `Hmm, let me see... ${studentName}, you possess qualities of all houses, but one stands out...`;
        
        setTimeout(() => {
            const capitalizedHouse = house.charAt(0).toUpperCase() + house.slice(1);
            finalDecision.innerHTML = `
                ${studentName}, you belong to ${capitalizedHouse}!<br>
                <img src="${houseLogos[house]}" alt="${capitalizedHouse} logo" class="house-logo" style="display: block; margin: 20px auto;">
            `;
            
            if (!studentExists(studentName)) {
                createNewStudent(studentName, capitalizedHouse);
            } else {
                finalDecision.innerHTML += '<p>You already have a house assignment!</p>';
            }

            if (isFirstSorting) {
                isFirstSorting = false;
                setTimeout(() => {
                    sortingControls.style.display = 'block';
                    displayAllStudents();
                }, 2000); // Display all students 2 seconds after showing the result
            }
        }, 2000);
    }

    function studentExists(name) {
        return students.some(student => student.name.toLowerCase() === name.toLowerCase());
    }

    function createNewStudent(name, house) {
        const newStudent = { name, house };
        students.push(newStudent);
    }

    function createStudentCard(student) {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';

        const houseColor = houseColors[student.house.toLowerCase()];

        card.innerHTML = `
            <div class="card h-100" style="background-color: ${houseColor}40;"> <!-- 40 is for 25% opacity -->
                <div class="row g-0">
                    <div class="col-md-4 d-flex align-items-center justify-content-center">
                        <img src="${houseLogos[student.house.toLowerCase()]}" class="img-fluid rounded-start house-crest" alt="${student.house} crest">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${student.name}</h5>
                            <p class="card-text">House: ${student.house}</p>
                            <button class="btn btn-danger expel-btn">Expel</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const expelBtn = card.querySelector('.expel-btn');
        expelBtn.addEventListener('click', () => {
            card.remove();
            students = students.filter(s => s.name !== student.name);
        });

        return card;
    }

    function displayAllStudents() {
        const container = document.getElementById('students-container');
        container.innerHTML = '<div class="row"></div>'; // Add a row container
        const row = container.querySelector('.row');
        students.forEach(student => {
            const card = createStudentCard(student);
            row.appendChild(card);
        });
        container.style.display = 'block';
        sortingControls.style.display = 'block';
    }

    function sortStudents(criteria) {
        students.sort((a, b) => {
            if (a[criteria].toLowerCase() < b[criteria].toLowerCase()) return -1;
            if (a[criteria].toLowerCase() > b[criteria].toLowerCase()) return 1;
            return 0;
        });
        displayAllStudents();
    }

    sortByNameBtn.addEventListener('click', () => sortStudents('name'));
    sortByHouseBtn.addEventListener('click', () => sortStudents('house'));
});
