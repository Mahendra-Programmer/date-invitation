const params = new URLSearchParams(window.location.search);
const girlName = params.get("name") || "Unknown";

document.addEventListener("DOMContentLoaded", () => {

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const result = document.getElementById("result");
    const noMessage = document.getElementById("noMessage");
    const musicBtn = document.getElementById("musicBtn");
    const bgMusic = document.getElementById("bgMusic");

    let musicPlaying = false;

    /* ================= MUSIC ================= */
    musicBtn.addEventListener("click", () => {

        if (!musicPlaying) {
            bgMusic.play();
            musicBtn.innerHTML = "⏸ Pause Music";
            musicPlaying = true;

            document.querySelector(".music-player").style.opacity = "0.05";
        } else {
            bgMusic.pause();
            musicBtn.innerHTML = "▶️ Play Music";
            musicPlaying = false;
        }
    });

    /* ================= FUNNY MESSAGES ================= */
    const funnyMessages = [
        "Yakin? 😢",
        "Kurang cepet? ❤️",
        "Yes aja 😆",
        "Gasiap ditolak",
        "Kamu setega itu?",
        "Button ini malu 😆",
        "Ga bakal nyesel 🥺",
        "Aku yang bayar 🍕",
        "Aku jelek ya? 🥺",
        "Please?! 😂"
    ];

    /* ================= YES BUTTON ================= */
    yesBtn.addEventListener("click", () => {

        result.innerHTML = `
            <div class="success-message">
                <h2>❤️ You Just Made My Day ❤️</h2>
                <p>Thank you for saying yes.</p>
                <p>I will text you soon with details 😊</p>
                <p>I can't wait to see you ❤️</p>
            </div>
        `;

        yesBtn.style.display = "none";
        noBtn.style.display = "none";

        if (noMessage) noMessage.style.display = "none";

        if (typeof confetti === "function") {
            confetti({
                particleCount: 250,
                spread: 120,
                origin: { y: 0.6 }
            });
        }

        sendEmail();
    });

    /* ================= SAFE NO BUTTON MOVEMENT ================= */
    function moveNoButton() {

        const padding = 20;

        const btnWidth = noBtn.offsetWidth || 100;
        const btnHeight = noBtn.offsetHeight || 50;

        const maxX = Math.max(0, window.innerWidth - btnWidth - padding);
        const maxY = Math.max(0, window.innerHeight - btnHeight - padding);

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        noBtn.style.position = "fixed";
        noBtn.style.left = randomX + "px";
        noBtn.style.top = randomY + "px";
        noBtn.style.transform = "none";
        noBtn.style.zIndex = "9999";

        /* ================= FUNNY MESSAGE ================= */
        if (noMessage) {

            const message =
                funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

            noMessage.textContent = message;
            noMessage.style.display = "block";

            noMessage.style.left = (randomX + 20) + "px";
            noMessage.style.top = (randomY - 40) + "px";

            clearTimeout(window.messageTimer);

            window.messageTimer = setTimeout(() => {
                noMessage.style.display = "none";
            }, 2000);
        }
    }

    /* ================= ENSURE BUTTON ALWAYS VISIBLE ON LOAD ================= */
    function initNoButton() {

        noBtn.style.position = "fixed";
        noBtn.style.left = "50%";
        noBtn.style.top = "70%";
        noBtn.style.transform = "translate(-50%, -50%)";
        noBtn.style.zIndex = "9999";
    }

    /* ================= EVENTS ================= */
    noBtn.addEventListener("mouseenter", moveNoButton);
    noBtn.addEventListener("touchstart", moveNoButton, { passive: true });

    window.addEventListener("load", initNoButton);
    window.addEventListener("resize", initNoButton);

});

/* ================= EMAIL ================= */
function sendEmail() {

    emailjs.init({
        publicKey: APP_CONFIG.emailjs.publicKey
    });

    emailjs.send(
        APP_CONFIG.emailjs.serviceId,
        APP_CONFIG.emailjs.templateId,
        {
            to_email: APP_CONFIG.notificationEmail,
            message: `${girlName} clicked YES on your date invitation ❤️`
        }
    )
    .then(() => console.log("Email sent"))
    .catch((error) => console.error(error));
}
