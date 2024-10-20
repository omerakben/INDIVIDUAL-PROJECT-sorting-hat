# Sorting Hat

## Overview
This project brings the Hogwarts sorting hat to life! As a developer, I'm following the provided instructions to create an interactive web application. The project is built using HTML, CSS, JavaScript, and Bootstrap, with a focus on JavaScript functions and methods. Users can input a student's name, and the app will assign them to a random Hogwarts house (Gryffindor, Hufflepuff, Ravenclaw, or Slytherin). Additional features include sorting students alphabetically by name or by house.

## Project Links
- [Wireframes/Prototype](#) (Add link when available)
- [Data Flowchart](#) (Add link when available)
- [Deployed Project](#) (Add link when available)
- [Project Board](https://github.com/omerakben/INDIVIDUAL-PROJECT-sorting-hat.git)

## User Story
As a Hogwarts administrator, I need a digital sorting hat to efficiently assign new students to houses and manage the student roster. This application solves the problem of manual sorting, providing a quick and fair way to distribute students among the four houses while allowing for easy management of the student list, including the ability to expel students when necessary.

## Features
- Interactive sorting hat introduction
- Student name input form
- Random house assignment
- Display of sorted students in cards
- Ability to expel students
- Filter students by house
- Sort students alphabetically or by house

## Screenshots
(Add screenshots of your project here)

## Key Learnings
- Advanced JavaScript methods and DOM manipulation
- Responsive design with Bootstrap 5
- Data structure management and array operations
- Event handling and dynamic content generation

## Personal Contributions
(Add your specific contributions to the project here)

## Challenges and Solutions
Adding gray scaled black-white background image also not touching the body elements,
understanding body::before (pseudo-element creates an overlay) took while to handle fixed for scrolling and resizing the browser
body {
    background-image: url('images/hogwarts-logo.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-color: #ffffff;
}

body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: -1;
}

Deciding to the how I handle if the all chosen values are same point like Gryffindor, Hufflepuf, Ravenclaw is same 1 point then I choose the easy way to make randomizing but putting on this logic and getting values adding functions take a hard to make it :

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
        let selectedHouses = [];

        for (const [house, score] of Object.entries(houseScores)) {
            if (score > maxScore) {
                maxScore = score;
                selectedHouses = [house];
            } else if (score === maxScore) {
                selectedHouses.push(house);
            }
        }

        const selectedHouse = selectedHouses[Math.floor(Math.random() * selectedHouses.length)];
        return selectedHouse.charAt(0).toUpperCase() + selectedHouse.slice(1);
    }


## Future Improvements
- Implement house colors for student cards
- Add animations for sorting and expelling students
- Create a more detailed student profile system
- Implement local storage to persist data

## Resources
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
- [JavaScript Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [CSS Tricks](https://css-tricks.com/)

## Reflections
(Add your personal reflections on the project, what you've learned, and how it has impacted your skills)

## Contributors
- [Omer Ozzy Akben](https://github.com/omerakben)

## Contact
([LinkedIn]https://www.linkedin.com/in/omerakben/)

## Demo
[Loom Video Walkthrough](#) (Add link to your Loom video, no more than 1 minute long)
