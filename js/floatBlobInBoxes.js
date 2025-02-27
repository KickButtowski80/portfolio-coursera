const blob = document.getElementById("blob");
const boxes = document.querySelectorAll(".cosmetic-box");


const pathPoints = Array.from(boxes).map(box => {
  return {
    x: box.offsetLeft + box.offsetWidth / 2,
    y: box.offsetTop + box.offsetHeight / 2
  };
});

let currentBoxIndex = 0;

let lastMoveTime = 0;
const moveInterval = 2000; // Milliseconds between moves

function animate(currentTime) {
  // Calculate elapsed time since the last move
  const elapsedTime = currentTime - lastMoveTime;
 // Check if it's time to move the blob
  if (elapsedTime >= moveInterval) {
    moveBlob();
    lastMoveTime = currentTime;
  }
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

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
