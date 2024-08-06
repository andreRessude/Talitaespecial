document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');
    // console.log(studentId)
    if (studentId) {
        fetchStudentData(studentId);
    } else {
        document.getElementById('student-name').textContent = 'Student Not Found';
    }
});

function fetchStudentData(student){
    fetch("students.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON.')
        }
        return response.json();
    })
    .then(data => {
        const studentInfo = data.students[student-1]
        buildLetter(studentInfo)
        // console.log(studentInfo)
        // console.log(data.students[student-1])
    })
    .catch(error => {
        console.error('Error:', error);
    })
}

function buildLetter(studentInfo){
    document.getElementById("student-letter-title").textContent = studentInfo.title;
    document.getElementById("student-name").textContent = studentInfo.name;
    document.getElementById("student-letter").textContent = studentInfo.letter;
    loadGallery(studentInfo.id ,studentInfo.nImages);
}

function loadGallery(id, num) {
    const gallery = document.getElementById('gallery');
    const src = `./images/pictures/student${id}/`
    for (let i = 0; i < num; i++){
        const item = document.createElement('div');
        item.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = src+`pic${i+1}.jpeg`;
        img.alt = `Gallery Image ${i+1}`;
        img.dataset.index = i;
        img.addEventListener('click', openModal);
        item.appendChild(img);
        gallery.appendChild(item);
    }
    createModal();
}

function createModal() {
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="close">&times;</span>
        <img class="modal-content" id="modalImage">
        <a class="prev">&#10094;</a>
        <a class="next">&#10095;</a>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close').addEventListener('click', closeModal);
    modal.querySelector('.prev').addEventListener('click', () => changeImage(-1));
    modal.querySelector('.next').addEventListener('click', () => changeImage(1));
}

function openModal(event) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = "block";
    modalImg.src = event.target.src;
    modalImg.dataset.index = event.target.dataset.index;
}

function closeModal() {
    document.getElementById('imageModal').style.display = "none";
}

function changeImage(direction) {
    const modalImg = document.getElementById('modalImage');
    let newIndex = parseInt(modalImg.dataset.index) + direction;
    const totalImages = document.querySelectorAll('.gallery-item img').length;
    
    if (newIndex < 0) newIndex = totalImages - 1;
    if (newIndex >= totalImages) newIndex = 0;

    const newSrc = document.querySelector(`.gallery-item img[data-index="${newIndex}"]`).src;
    modalImg.src = newSrc;
    modalImg.dataset.index = newIndex;
}

// Close the modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target == modal) {
        closeModal();
    }
}