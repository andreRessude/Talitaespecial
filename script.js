document.addEventListener('DOMContentLoaded', () => {
    fetchImages();
});

async function fetchImages() {
    try {
        const response = await fetch('students.json');
        const data = await response.json();
        // data.students.forEach((info) => {
        //     console.log(info.alt)
        // })
        showProfile(data.students);
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function showProfile(data) {
    const gallery = document.getElementById('gallery-grid');
    data.forEach((info) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = `./images/profile/student${info.id}.jpeg`;
        img.alt = `Foto do(a) aluno(a) ${info.name}`;
        item.appendChild(img);
        item.addEventListener("click", () => {
            window.location.href = `letter.html?id=${info.id}`;
        });

        gallery.appendChild(item);
    });
}

// Function to change the number of columns in the grid
// function setGridColumns(columns) {
//     const gallery = document.getElementById('gallery-grid');
//     gallery.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
// }
