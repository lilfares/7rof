// Get the container for hexagons
const hexGrid = document.querySelector('.hex-grid');

// Number of rows and hexagons per row
const numRows = 5;
const numHexagonsPerRow = 5;

// Array containing URLs of your 28 photos
const photoUrls = [
    "L1.png", "L2.png", "L3.png", "L4.png", "L5.png", "L6.png", "L7.png", "L8.png", "L9.png", 
    "L10.png", "L11.png", "L12.png", "L13.png", "L14.png", "L15.png", "L16.png", "L17.png", 
    "L18.png", "L19.png", "L20.png", "L21.png", "L22.png", "L23.png", "L24.png", "L25.png", 
    "L26.png", "L27.png", "L28.png"
];

// Array to store unused photo URLs (initialized with all URLs)
let unusedPhotoUrls = [...photoUrls];

// Function to create a single hexagon element with a random photo
function createHexagon() {
    const hexagon = document.createElement('div');
    hexagon.className = 'hexagon';

    // If all photos are used, log an error and return an empty hexagon
    if (unusedPhotoUrls.length === 0) {
        console.error('All photos are used.');
        return hexagon;
    }

    // Pick a random photo from the unused list
    const randomIndex = Math.floor(Math.random() * unusedPhotoUrls.length);
    const imgUrl = unusedPhotoUrls.splice(randomIndex, 1)[0];  // Remove the selected URL from unused array

    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = 'Image';

    // Set the width and height of the image to match the dimensions of the hexagon
    img.style.width = '100%';
    img.style.height = '100%';

    hexagon.appendChild(img);

    // Add click event listener to change image on click
    let clickCount = 0; // Variable to track the number of clicks
    hexagon.addEventListener('click', () => {
        clickCount++;

        if (clickCount % 4 === 1) {
            // First click: show the original image
            img.src = imgUrl;
            img.style.filter = 'none';
        } else if (clickCount % 4 === 2) {
            // Second click: apply yellowish tint
            img.style.filter = 'sepia(1) saturate(2) hue-rotate(0deg)';
        } else if (clickCount % 4 === 3) {
            // Third click: show red.png
            img.src = 'red.png';
            img.style.filter = 'none';
        } else if (clickCount % 4 === 0) {
            // Fourth click: show green.png
            img.src = 'green.png';
            img.style.filter = 'none';
        }
    });

    return hexagon;
}

// Function to create a row of hexagons
function createRow() {
    const row = document.createElement('div');
    row.className = 'hex-row';

    for (let i = 0; i < numHexagonsPerRow; i++) {
        row.appendChild(createHexagon());
    }

    return row;
}

// Initialize the grid by creating rows and appending them to the hexGrid container
for (let i = 0; i < numRows; i++) {
    hexGrid.appendChild(createRow());
}
