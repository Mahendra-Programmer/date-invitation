const params = new URLSearchParams(window.location.search);
const girlName = params.get("name") || "Unknown";

document.addEventListener("DOMContentLoaded", () => {
    
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const noMessage = document.getElementById("noMessage");
const musicBtn =
    document.getElementById("musicBtn");

const bgMusic =
    document.getElementById("bgMusic");

let musicPlaying = false;

musicBtn.addEventListener("click", () => {

    if(!musicPlaying){

        bgMusic.play();

        musicBtn.innerHTML =
            "⏸ Pause Music";

        musicPlaying = true;
        
        document.querySelector(".music-player").style.opacity = "0.05";
    } else {

        bgMusic.pause();

        musicBtn.innerHTML =
            "▶️ Play Music";

        musicPlaying = false;

    }

});
const funnyMessages = [
    "Are you sure? 😢",
    "Too slow? ❤️",
    "That button seems shy today 😆",
    "You will not regret it! 🥺",
    "At least consider the food 🍕",
    "Am I Ugly?🥺",
    "Please?! 😂"
];

// YES BUTTON
yesBtn.addEventListener("click", () => {

    result.innerHTML = `
        <div class="success-message">
            <h2>❤️ You Just Made My Day ❤️</h2>

            <p>
                Thank you for saying yes.
            </p>

            <p>
                I will text you personally with all the details very soon. 😊
            </p>

            <p>
                I can't wait to see you ❤️
            </p>
        </div>
    `;

    yesBtn.style.display = "none";
    noBtn.style.display = "none";

    if (noMessage) {
        noMessage.style.display = "none";
    }

    if (typeof confetti === "function") {

        confetti({
            particleCount: 250,
            spread: 120,
            origin: {
                y: 0.6
            }
        });

    }

    sendEmail();

});

// NO BUTTON MOVEMENT
function moveNoButton() {

    const maxX =
        window.innerWidth -
        noBtn.offsetWidth - 50;

    const maxY =
        window.innerHeight -
        noBtn.offsetHeight - 50;

    const randomX =
        Math.floor(Math.random() * maxX);

    const randomY =
        Math.floor(Math.random() * maxY);

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

    const message =
        funnyMessages[
            Math.floor(
                Math.random() *
                funnyMessages.length
            )
        ];

    if (noMessage) {

        noMessage.textContent = message;

        noMessage.style.display = "block";

        noMessage.style.left =
            (randomX - 20) + "px";

        noMessage.style.top =
            (randomY - 50) + "px";

        clearTimeout(window.messageTimer);

        window.messageTimer =
            setTimeout(() => {

                noMessage.style.display =
                    "none";

            }, 2000);

    }

}

// Desktop
noBtn.addEventListener(
    "mouseenter",
    moveNoButton
);

// Mobile
noBtn.addEventListener(
    "touchstart",
    moveNoButton
);

});

function sendEmail() {

emailjs.init({
    publicKey:
        APP_CONFIG.emailjs.publicKey
});

emailjs.send(

    APP_CONFIG.emailjs.serviceId,

    APP_CONFIG.emailjs.templateId,

    {
        to_email:
            APP_CONFIG.notificationEmail,

        message:
            `${girlName} clicked YES on your date invitation ❤️`
    }

)
.then(() => {

    console.log("Email sent");

})
.catch((error) => {

    console.error(error);

});

}
