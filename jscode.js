// Get the container for hexagons
const hexGrid = document.querySelector('.hex-grid');

// Number of rows and hexagons per row
const numRows = 5;
const numHexagonsPerRow = 5;

// Counter for hexagon IDs
let hexagonCount = 0;

// Function to create a single hexagon element
// Array containing URLs of your 28 photos
const photoUrls = [
    "L1.png",
    "L2.png",
    "L3.png",
    "L4.png",
    "L5.png",
    "L6.png",
    "L7.png",
    "L8.png",
    "L9.png",
    "L10.png",
    "L11.png",
    "L12.png",
    "L13.png",
    "L14.png",
    "L15.png",
    "L16.png",
    "L17.png",
    "L18.png",
    "L19.png",
    "L20.png",
    "L21.png",
    "L22.png",
    "L23.png",
    "L24.png",
    "L25.png",
    "L26.png",
    "L27.png",
    "L28.png"


    // Add more URLs as needed
];


// Function to create a single hexagon element with a random photo
// Create an array to store used photo URLs
let usedPhotoUrls = [];

function createHexagon() {
    const hexagon = document.createElement('div');
    hexagon.className = 'hexagon';

    // If all photos are used, log an error and return an empty hexagon
    if (usedPhotoUrls.length === photoUrls.length) {
        console.error('All photos are used.');
        return hexagon;
    }

    // Shuffle the array of photoUrls to ensure randomness
    const shuffledUrls = photoUrls.slice().sort(() => Math.random() - 0.5);

    // Find the first unused URL from the shuffled array
    let imgUrl;
    for (let i = 0; i < shuffledUrls.length; i++) {
        if (!usedPhotoUrls.includes(shuffledUrls[i])) {
            imgUrl = shuffledUrls[i];
            break;
        }
    }

    // Add the used URL to the list
    usedPhotoUrls.push(imgUrl);

    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = 'Image';

    // Set the width and height of the image to match the dimensions of the hexagon
    img.style.width = '100%';
    img.style.height = '100%';

    hexagon.appendChild(img);

    // Add click event listener to change image on click
    let clickCount = 0; // Variable to track the number of clicks
    const specifiedUrls = [imgUrl, 'red.png', 'green.png']; // Array of specified image URLs
    hexagon.addEventListener('click', () => {
        clickCount++;
        const newImgUrl = specifiedUrls[clickCount % specifiedUrls.length]; // Toggle between the specified URLs
        img.src = newImgUrl;
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

// Function to toggle the active state of a hexagon
function toggleHexagon(hexagon) {
    hexagon.classList.toggle('active');
    const topTriangle = hexagon.querySelector('.top-triangle');
    const bottomTriangle = hexagon.querySelector('.bottom-triangle');
    topTriangle.classList.toggle('active');
    bottomTriangle.classList.toggle('active');
}

// Initialize the grid by creating rows and appending them to the hexGrid container
for (let i = 0; i < numRows; i++) {
    hexGrid.appendChild(createRow());
}