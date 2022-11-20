//html elements
const popup = document.getElementById("retroPopup");
const closePopup = document.getElementById("closePopup");
const start = document.getElementById("start");
const stopButton = document.getElementById("stop");
const bicycleImage = document.getElementById("bicycle");

//popup controls
const popupDelay = 3000;
let popupDisplay = false;

//timer handlers
let popupTimerHandler;
let animationHandler;
let timeoutHandler;

//image indexes
const firstImage = 1;
const lastImage = 34;
let currentImage = 1;

//animation controls
let animationStarted = false;
let goUp = true;

//show popup after delay
popupTimerHandler = setTimeout(function () {
    popup.style.transition = "opacity 1s";
    popup.style.opacity = 1;
    popupDisplay = true;
}, popupDelay);

//close popup
closePopup.addEventListener("click", function () {
    popup.style.display = "none";
});

//starts animation
start.addEventListener("click", function () {
    //don't show popup if user starts the animation first
    clearTimeout(popupTimerHandler);

    //hide the popup if it has already appeared
    if (popupDisplay) {
        popup.style.display = "none";
    }

    //start the animation if it hasn't started
    if (!animationStarted) {
        animationStarted = true;
        animationHandler = requestAnimationFrame(changeImage);
    }
});

//loop trough the images
function changeImage() {
    timeoutHandler = setTimeout(function () {
        if (goUp) {
            currentImage++;
            if (currentImage == lastImage) {
                goUp = false;
            }
        } else {
            currentImage--;
            if (currentImage == firstImage) {
                goUp = true;
            }
        }

        bicycleImage.src = `product-images/bike-${currentImage}.jpg`;
        animationHandler = requestAnimationFrame(changeImage);
    }, 100);
}

//stops animation
stopButton.addEventListener("click", function () {
    animationStarted = false;
    cancelAnimationFrame(animationHandler);
    clearTimeout(timeoutHandler);
});