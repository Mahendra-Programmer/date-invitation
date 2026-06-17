document.addEventListener("DOMContentLoaded", () => {
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const result = document.getElementById("noMessage");
const funnyMessages = [
"Are you sure? 😢",
"Maybe give it another thought? ❤️",
"That button seems shy today 😆",
"I worked hard on this page! 🥺",
"At least consider the food 🍕",
"You found it again?! 😂"
];

// YES BUTTON
yesBtn.addEventListener("click", () => {

    result.innerHTML =
    "🎉 Yay! Looking forward to our date ❤️";

    if(typeof confetti === "function"){

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

// PLAYFUL NO BUTTON
function moveNoButton(){

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

function sendEmail(){

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
        "Someone clicked YES ❤️"

    }

)
.then(() => {

    console.log("Email sent");

})
.catch((error) => {

    console.error(error);

});


}
