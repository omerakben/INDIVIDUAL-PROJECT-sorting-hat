document.addEventListener('DOMContentLoaded', () => {
    const nameForm = document.getElementById('name-form');
    const nameInput = document.getElementById('name-input');
    const sortingOptions = document.getElementById('sorting-options');
    const studentNameSpan = document.getElementById('student-name');
    const quizOption = document.getElementById('quiz-option');
    const randomOption = document.getElementById('random-option');
    const sortingForm = document.getElementById('sorting-form');
    const sortingQuiz = document.getElementById('sorting-quiz');
    const sortingResult = document.getElementById('sorting-result');

    let studentName = '';

    nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        studentName = document.getElementById('name').value;
        nameInput.style.display = 'none';
        studentNameSpan.textContent = studentName;
        sortingOptions.style.display = 'block';
    });

    quizOption.addEventListener('click', () => {
        sortingOptions.style.display = 'none';
        sortingForm.style.display = 'block';
    });

    randomOption.addEventListener('click', () => {
        sortingOptions.style.display = 'none';
        displaySortingResult(studentName, getRandomHouse());
    });

    sortingQuiz.addEventListener('submit', (e) => {
        e.preventDefault();
        let house = calculateHouseFromQuiz();
        displaySortingResult(studentName, house);
    });

    function calculateHouseFromQuiz() {
        const challengeReaction = document.getElementById('challenge-reaction').value;
        const importantValue = document.getElementById('important-value').value;
        const groupRole = document.getElementById('group-role').value;

        const houseScores = {
            gryffindor: 0,
            hufflepuff: 0,
            ravenclaw: 0,
            slytherin: 0
        };

        houseScores[challengeReaction]++;
        houseScores[importantValue]++;
        houseScores[groupRole]++;

        let maxScore = 0;
        let selectedHouse = '';

        for (const [house, score] of Object.entries(houseScores)) {
            if (score > maxScore) {
                maxScore = score;
                selectedHouse = house;
            }
        }

        return selectedHouse.charAt(0).toUpperCase() + selectedHouse.slice(1);
    }

    function getRandomHouse() {
        const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
        return houses[Math.floor(Math.random() * houses.length)];
    }

    function displaySortingResult(name, house) {
        const contemplation = document.getElementById('sorting-contemplation');
        const finalDecision = document.getElementById('final-decision');
        const sortingResult = document.getElementById('sorting-result');

        sortingForm.style.display = 'none';
        sortingResult.style.display = 'block';

        contemplation.textContent = `Hmm, let me see... ${name}, where shall I put you?`;
        
        setTimeout(() => {
            finalDecision.textContent = `${name}, you belong in... ${house}!`;
            
            // Create and display the house logo
            const logoImg = document.createElement('img');
            logoImg.src = `images/${house.toLowerCase()}-logo.png`;
            logoImg.alt = `${house} Logo`;
            logoImg.className = 'house-logo';
            
            // Remove any existing logos
            const existingLogo = sortingResult.querySelector('.house-logo');
            if (existingLogo) {
                existingLogo.remove();
            }
            
            // Insert the new logo before the final decision text
            sortingResult.insertBefore(logoImg, finalDecision);
            
            // Display the logo
            logoImg.style.display = 'block';
        }, 2000);
    }
});
