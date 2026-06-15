document.addEventListener("DOMContentLoaded", () => {
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");

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
