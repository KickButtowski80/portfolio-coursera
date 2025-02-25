const blob = document.getElementById("blob");
const boxes = document.querySelectorAll(".cosmetic-box");
const container = document.querySelector('.cosmetic-boxes'); // Assuming the container has this class
const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;

const pathPoints = [
  { x: containerWidth * 0.5, y: containerHeight * 0.05 }, // Box one: top: 5%, left: 50%
  { x: containerWidth * 0.4, y: containerHeight },         // Box two: bottom: 0%, left: 40%
  { x: containerWidth * 0.3, y: containerHeight * 0.1 },  // Box three: top: 10%, left: 30%
  { x: containerWidth * 0.1, y: containerHeight * 0.35 }  // Box four: top: 35%, left: 10%
];


let currentBoxIndex = 0;




function moveBlob() {
  // Remove shake animation from all boxes
  boxes.forEach((box) => box.classList.remove("shake"));

  // Get the next box in the sequence
  const nextBox = boxes[currentBoxIndex];
  currentBoxIndex = (currentBoxIndex + 1) % boxes.length;

  // Calculate the center of the next box
  const boxX = nextBox.offsetLeft + nextBox.offsetWidth / 2;
  const boxY = nextBox.offsetTop + nextBox.offsetHeight / 2;

  // Move the blob to the center of the next box
  blob.style.left = `${boxX}px`;
  blob.style.top = `${boxY}px`;

  blob.addEventListener(
    "transitionend",
    () => {
      // Add shake animation to the current box
      nextBox.classList.add("shake");

      // Remove shake animation after a short delay
      setTimeout(() => {
        nextBox.classList.remove("shake");
      }, 1000);
    },
    { once: true }
  );
}

setInterval(moveBlob, 2000);
