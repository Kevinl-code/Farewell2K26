window.addEventListener("DOMContentLoaded", () => {

  // =========================
  // COUNTDOWN
  // =========================

  const revealTime = new Date("Feb 23, 2026 01:05:00").getTime();
  const timer = document.getElementById("timer");

  const countdown = setInterval(() => {

    const now = new Date().getTime();
    const diff = revealTime - now;

    if (diff <= 0) {
      clearInterval(countdown);
      document.getElementById("lockScreen").style.display = "none";
      startCinematic();
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    timer.innerHTML = `${d}d ${h}h ${m}m ${s}s`;

  }, 1000);


  // =========================
  // CINEMATIC FLOW
  // =========================

  function startCinematic() {
    document.getElementById("photoSection").classList.remove("hidden");
    flyPhotos();
  }


  // =========================
  // PHOTO TRAVEL
  // =========================

  function flyPhotos() {

    const container = document.getElementById("photoContainer");
    container.innerHTML = ""; // clear before use

    const totalPhotos = 58;

    for (let i = 1; i <= totalPhotos; i++) {

      const img = document.createElement("img");
      img.src = `images/seniors/${i}.jpg`;

      img.style.top = Math.random() * window.innerHeight + "px";
      img.style.left = (Math.random() > 0.5 ? -200 : window.innerWidth + 200) + "px";

      container.appendChild(img);

      setTimeout(() => {
        img.style.opacity = "1";
        img.style.top = (window.innerHeight / 2 - 150 + Math.random() * 300) + "px";
        img.style.left = (window.innerWidth / 2 - 250 + Math.random() * 500) + "px";
        img.style.transform = "scale(1)";
      }, i * 120);
    }

    setTimeout(() => zoomCollage(), 9000);
  }


  // =========================
  // ZOOM EFFECT
  // =========================

  function zoomCollage() {

    const imgs = document.querySelectorAll("#photoContainer img");

    imgs.forEach((img, index) => {
      setTimeout(() => {
        img.style.transform = "scale(2.2)";
      }, index * 40);
    });

    setTimeout(() => {

      document.getElementById("photoSection").classList.add("hidden");
      document.getElementById("blackTransition").classList.remove("hidden");

      setTimeout(() => showPoster(), 2000);

    }, 4000);
  }


  // =========================
  // SHOW POSTER
  // =========================

  function showPoster() {
    document.getElementById("blackTransition").classList.add("hidden");

    const invite = document.getElementById("inviteSection");
    invite.classList.remove("hidden");
    invite.style.opacity = "1";
  }


  // =========================
  // POSTER CLICK
  // =========================

  const poster = document.getElementById("poster");

  poster.addEventListener("click", () => {

    const invite = document.getElementById("inviteSection");
    const eventSection = document.getElementById("eventSection");

    invite.style.transition = "1s";
    invite.style.opacity = "0";

    setTimeout(() => {

      invite.classList.add("hidden");

      eventSection.classList.remove("hidden");
      eventSection.style.display = "flex";
      eventSection.style.opacity = "1";

      startEvents(); // FORCE start here

    }, 1000);
  });


  // =========================
  // EVENT SEQUENCE
  // =========================

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

    const display = document.getElementById("eventDisplay");

    if (!display) {
      console.log("eventDisplay not found!");
      return;
    }

    display.innerText = "";
    display.style.opacity = "0";

    let i = 0;

    function nextEvent() {

      if (i >= events.length) return;

      display.style.opacity = "0";

      setTimeout(() => {
        display.innerText = events[i];
        display.style.opacity = "1";
        i++;
        setTimeout(nextEvent, 3000);
      }, 500);
    }

    nextEvent();
  }

});
