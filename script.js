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
        "Aku malu 😆",
        "Ga bakal nyesel 🥺",
        "Aku yang bayar 🍕",
        "Please?! 😂"
    ];

    /* ================= YES BUTTON ================= */
    yesBtn.addEventListener("click", () => {

        result.innerHTML = `
            <div class="success-message">
                <h2>❤️ You Just Made My Day ❤️</h2>
                <p>Thank you for saying yes.</p>
                <p>I will text you soon 😊</p>
                <p>Can't wait ❤️</p>
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

    /* ================= SAFE SIDE-BY-SIDE NO BUTTON ================= */

    function moveNoButton() {

        const padding = 10;

        const card = document.querySelector(".card");
        const cardRect = card.getBoundingClientRect();

        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // ONLY MOVE INSIDE CARD (NOT FULL SCREEN)
        const maxX = cardRect.width - btnWidth - padding;
        const maxY = cardRect.height - btnHeight - padding;

        const randomX = Math.max(0, Math.random() * maxX);
        const randomY = Math.max(0, Math.random() * maxY);

        // make sure it's relative to card
        noBtn.style.position = "absolute";
        noBtn.style.left = randomX + "px";
        noBtn.style.top = randomY + "px";

        noBtn.style.transform = "none";
        noBtn.style.zIndex = "10";

        /* ================= MESSAGE ================= */
        if (noMessage) {

            const message =
                funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

            noMessage.textContent = message;
            noMessage.style.display = "block";

            noMessage.style.left = (cardRect.left + randomX + 20) + "px";
            noMessage.style.top = (cardRect.top + randomY - 40) + "px";

            clearTimeout(window.messageTimer);

            window.messageTimer = setTimeout(() => {
                noMessage.style.display = "none";
            }, 2000);
        }
    }

    /* ================= EVENTS (IMPORTANT FIX) ================= */
    let movedOnce = false;

    noBtn.addEventListener("mouseenter", () => {
        if (!movedOnce) movedOnce = true;
        moveNoButton();
    });

    noBtn.addEventListener("mouseover", moveNoButton);

    noBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        moveNoButton();
    }, { passive: false });

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
            message: `${girlName} clicked YES ❤️`
        }
    )
    .then(() => console.log("Email sent"))
    .catch((error) => console.error(error));
}
