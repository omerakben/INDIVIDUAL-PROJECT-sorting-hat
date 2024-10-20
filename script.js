import students from './data.js';

function createStudentCard(student) {
    const card = document.createElement('div');
    card.className = 'card mb-3';
    card.style.maxWidth = '540px';

    const houseImages = {
        Gryffindor: 'images/gryffindor-logo.png',
        Slytherin: 'images/slytherin-logo.png',
        Ravenclaw: 'images/ravenclaw-logo.png',
        Hufflepuff: 'images/hufflepuff-logo.png'
    };

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
                </div>
            </div>
        </div>
    `;

    const expelBtn = card.querySelector('.expel-btn');
    expelBtn.addEventListener('click', () => {
        card.remove();
    });

    return card;
}

function displayStudents() {
    const container = document.getElementById('students-container');
    students.forEach(student => {
        const card = createStudentCard(student);
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', displayStudents);
