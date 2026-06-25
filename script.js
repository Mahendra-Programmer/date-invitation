const params = new URLSearchParams(window.location.search);
const girlName = params.get("name") || "Unknown";

document.addEventListener("DOMContentLoaded", () => {
const cover = document.getElementById("cover");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("bgMusic");
const playlist = [
    "music/song1.mp3",
    "music/song2.mp3",
    "music/song3.mp3"
];

const songNames = [
    "Date Night Vibes",
    "Perfect",
    "Until I Found You"
];

let currentSong = 0;

bgMusic.src = playlist[currentSong];
document.querySelector(".song-title").textContent =
    "🎵 " + songNames[currentSong];
cover.addEventListener("click", () => {

    cover.classList.add("fade-out");

setTimeout(() => {

    cover.style.display = "none";
    mainContent.classList.remove("hidden");

    document.querySelector(".music-player").style.display = "flex";

    music.play();

    musicBtn.innerHTML = "⏸ Pause Music";
    musicPlaying = true;

}, 800);
});    
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
    const nextSongBtn =
    document.getElementById("nextSongBtn");

nextSongBtn.addEventListener("click", () => {

    currentSong++;

    if(currentSong >= playlist.length){
        currentSong = 0;
    }

    bgMusic.src = playlist[currentSong];

    document.querySelector(".song-title").textContent =
        "🎵 " + songNames[currentSong];

    bgMusic.play();

    musicBtn.innerHTML = "⏸ Pause Music";
    musicPlaying = true;

});
    bgMusic.addEventListener("ended", () => {

    currentSong++;

    if(currentSong >= playlist.length){
        currentSong = 0;
    }

    bgMusic.src = playlist[currentSong];

    document.querySelector(".song-title").textContent =
        "🎵 " + songNames[currentSong];

    bgMusic.play();

});
const funnyMessages = [
    "Maaf tidak menerima NO? 😢",
    "you are love of my life? ❤️",
    "Terlalu lambat 😆",
    "Ga bakal nyesel deh! 🥺",
    "Beri aku kesempatan 🍕",
    "Sejelek itu aku?🥺",
    "Kamu setega itu ",
    "Nanti juga sayang",
    "Coba lagi",
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
function createHearts() {
  const container = document.querySelector(".hearts");

  for (let i = 0; i < 10; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 5 + Math.random() * 5 + "s";
    heart.style.setProperty("--x-move", (Math.random() * 200 - 100) + "px");
    heart.style.fontSize = 12 + Math.random() * 20 + "px";

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 10000);
  }
}

setInterval(createHearts, 2000);
createHearts();
function createGlow() {
  const glow = document.createElement("div");
  glow.classList.add("glow");

  // posisi random
  glow.style.left = Math.random() * window.innerWidth + "px";
  glow.style.top = Math.random() * window.innerHeight + "px";

  // warna soft pink + white
  const colors = [
    "rgba(255,255,255,0.9)",
    "rgba(255,182,193,0.8)"
  ];

  const color = colors[Math.floor(Math.random() * colors.length)];

  glow.style.background = color;
  glow.style.boxShadow = `0 0 12px ${color}`;

  document.body.appendChild(glow);

  setTimeout(() => {
    glow.remove();
  }, 2000);
}

setInterval(createGlow, 500);
createGlow();
