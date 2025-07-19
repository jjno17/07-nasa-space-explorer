// NASA Space Explorer - Beginner-friendly code with modal and image info

const NASA_API_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = 'DEMO_KEY'; // Replace with your own key for more requests

const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const gallery = document.getElementById('gallery');
const getImagesButton = document.querySelector('.filters button');

// Modal elements
const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalExplanation = document.getElementById('modalExplanation');
const closeModal = document.getElementById('closeModal');

// Show modal function
function showModal(imageData) {
  modalImg.src = imageData.url;
  modalImg.alt = imageData.title;
  modalTitle.textContent = imageData.title;
  modalDate.textContent = imageData.date;
  modalExplanation.textContent = imageData.explanation;
  imageModal.style.display = 'flex';
}

// Hide modal when clicking close button or outside modal
closeModal.onclick = () => {
  imageModal.style.display = 'none';
};
window.onclick = (event) => {
  if (event.target === imageModal) {
    imageModal.style.display = 'none';
  }
};

// Listen for button click to get images
getImagesButton.addEventListener('click', () => {
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

  if (!startDate || !endDate) {
    gallery.innerHTML = '<p>Please select both start and end dates.</p>';
    return;
  }

  fetchImages(startDate, endDate);
});

// Fetch images from NASA API
function fetchImages(startDate, endDate) {
  const url = `${NASA_API_URL}?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const images = Array.isArray(data) ? data : [data];
      const nineImages = images.slice(0, 9);

      let galleryHTML = '';
      nineImages.forEach((item, idx) => {
        if (item.media_type === 'image') {
          // Each image is inside a bordered container with title and date
          galleryHTML += `
            <div class="image-card">
              <img 
                src="${item.url}" 
                alt="${item.title}" 
                title="${item.title}" 
                class="gallery-img"
                data-idx="${idx}"
                style="cursor:pointer;"
              />
              <div class="image-info">
                <div class="image-title">${item.title}</div>
                <div class="image-date">${item.date}</div>
              </div>
            </div>
          `;
        }
      });

      if (galleryHTML === '') {
        gallery.innerHTML = '<p>No images found for this date range.</p>';
      } else {
        gallery.innerHTML = galleryHTML;

        // Add click event to each image to open modal
        const galleryImgs = document.querySelectorAll('.gallery-img');
        galleryImgs.forEach(img => {
          img.onclick = () => {
            const idx = img.getAttribute('data-idx');
            showModal(nineImages[idx]);
          };
        });
      }
    })
    .catch(error => {
      gallery.innerHTML = `<p>Error fetching images: ${error.message}</p>`;
    });
}

// Beginner-friendly: Array of fun space facts
const spaceFacts = [
  "Did you know? The Sun accounts for about 99.86% of the mass in our solar system.",
  "Did you know? One million Earths could fit inside the Sun.",
  "Did you know? Venus is the hottest planet in our solar system.",
  "Did you know? A day on Venus is longer than its year.",
  "Did you know? Neutron stars can spin at a rate of 600 times per second.",
  "Did you know? Jupiter has 92 known moons!",
  "Did you know? The footprints on the Moon will remain for millions of years.",
  "Did you know? Space is completely silent.",
  "Did you know? There are more trees on Earth than stars in the Milky Way.",
  "Did you know? Saturn could float in water because it’s mostly made of gas."
];

// Pick a random fact from the array
const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];

// Find the space fact section in the HTML
const spaceFactSection = document.getElementById('space-fact');

// Show the random fact in the section
spaceFactSection.innerHTML = `<p>${randomFact}</p>`;
