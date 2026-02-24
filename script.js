// ===============================
// ===== WAIT FOR DOM LOAD =======
// ===============================

window.addEventListener("DOMContentLoaded", () => {

  // ===== TIME LOCK =====

  const revealTime = new Date("Feb 23, 2026 01:05:00").getTime();
  const timer = document.getElementById("timer");

  let countdown = setInterval(() => {

    let now = new Date().getTime();
    let diff = revealTime - now;

    if (diff <= 0) {
      clearInterval(countdown);
      document.getElementById("lockScreen").style.display = "none";
      startCinematic();
    }

    let d = Math.floor(diff / (1000 * 60 * 60 * 24));
    let h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((diff % (1000 * 60)) / 1000);

    timer.innerHTML = `${d}d ${h}h ${m}m ${s}s`;

  }, 1000);


  // ===============================
  // ===== CINEMATIC FLOW ==========
  // ===============================

  function startCinematic() {
    document.getElementById("photoSection").classList.remove("hidden");
    flyPhotos();
  }


  // ===============================
  // ===== PHOTO TRAVEL + ZOOM =====
  // ===============================

  function flyPhotos() {

    let container = document.getElementById("photoContainer");
    const totalPhotos = 58; // EXACT 55 PHOTOS

    for (let i = 1; i <= totalPhotos; i++) {

      let img = document.createElement("img");
      img.src = `images/seniors/${i}.jpg`;

      // Start from outside screen (left or right)
      img.style.top = Math.random() * window.innerHeight + "px";
      img.style.left = (Math.random() > 0.5 ? -200 : window.innerWidth + 200) + "px";

      container.appendChild(img);

      // Cinematic movement toward center
      setTimeout(() => {
        img.style.opacity = "1";
        img.style.top = (window.innerHeight / 2 - 150 + Math.random() * 300) + "px";
        img.style.left = (window.innerWidth / 2 - 250 + Math.random() * 500) + "px";
        img.style.transform = "scale(1)";
      }, i * 120);
    }

    // After settle → Zoom blast
    setTimeout(() => {
      zoomCollage();
    }, 9000);
  }


  // ===============================
  // ===== ZOOM COLLAGE ============
  // ===============================

  function zoomCollage() {

    let imgs = document.querySelectorAll("#photoContainer img");

    imgs.forEach((img, index) => {
      setTimeout(() => {
        img.style.transform = "scale(2.2)";
      }, index * 40);
    });

    // Fade to black transition
    setTimeout(() => {

      document.getElementById("photoSection").classList.add("hidden");
      document.getElementById("blackTransition").classList.remove("hidden");

      setTimeout(() => {
        showPoster();
      }, 2000);

    }, 4000);
  }


  // ===============================
  // ===== SHOW INVITATION =========
  // ===============================

  function showPoster() {
    document.getElementById("blackTransition").classList.add("hidden");
    document.getElementById("inviteSection").classList.remove("hidden");
  }


  // ===============================
  // ===== POSTER CLICK NAVIGATION =
  // ===============================

  const poster = document.getElementById("poster");

  poster.addEventListener("click", () => {

    const invite = document.getElementById("inviteSection");
    const eventSection = document.getElementById("eventSection");

    // Fade out invite
    invite.style.transition = "1s";
    invite.style.opacity = "0";

    setTimeout(() => {

      invite.classList.add("hidden");
      invite.style.opacity = "1";

      // Show events
      eventSection.classList.remove("hidden");
      eventSection.style.opacity = "0";

      setTimeout(() => {
        eventSection.style.transition = "1.5s";
        eventSection.style.opacity = "1";
        startEvents(); // Start events ONLY after click
      }, 100);

    }, 1000);
  });


  // ===============================
  // ===== EVENT SEQUENCE ==========
  // ===============================

  const events = [
    "Welcome & Opening Ceremony",
    "Fun Games & Interaction",
    "Cultural Performances",
    "Memory Sharing",
    "Awards & Gratitude",
    "Dinner",
    "Final Emotional Goodbye"
  ];

  function startEvents() {

    let display = document.getElementById("eventDisplay");
    let i = 0;

    function nextEvent() {
      if (i < events.length) {
        display.innerText = events[i];
        i++;
        setTimeout(nextEvent, 3000);
      }
    }

    nextEvent();
  }

});
