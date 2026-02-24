// ===== TIME LOCK =====

const revealTime = new Date("Feb 23, 2026 01:05:00").getTime();
const timer = document.getElementById("timer");

let countdown = setInterval(()=>{

 let now = new Date().getTime();
 let diff = revealTime - now;

 if(diff <= 0){
   clearInterval(countdown);
   document.getElementById("lockScreen").style.display="none";
   startCinematic();
 }

 let d=Math.floor(diff/(1000*60*60*24));
 let h=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
 let m=Math.floor((diff%(1000*60*60))/(1000*60));
 let s=Math.floor((diff%(1000*60))/1000);

 timer.innerHTML=`${d}d ${h}h ${m}m ${s}s`;

},1000);


// ===== CINEMATIC FLOW =====

function startCinematic(){
 document.getElementById("photoSection").classList.remove("hidden");
 flyPhotos();
}


// ===== PHOTO TRAVEL + ZOOM =====

function flyPhotos(){

 let container=document.getElementById("photoContainer");
 const totalPhotos = 58; // EXACT 55

 for(let i=1;i<=totalPhotos;i++){

  let img=document.createElement("img");
  img.src=`images/seniors/${i}.jpg`;

  // Start scattered outside screen
  img.style.top = Math.random()*window.innerHeight+"px";
  img.style.left = (Math.random()*2>1? -200 : window.innerWidth+200)+"px";

  container.appendChild(img);

  // Cinematic entry
  setTimeout(()=>{
    img.style.opacity="1";
    img.style.top = (window.innerHeight/2 - 150 + Math.random()*300)+"px";
    img.style.left = (window.innerWidth/2 - 250 + Math.random()*500)+"px";
    img.style.transform="scale(1)";
  }, i*120);

 }

 // After all settle → zoom blast
 setTimeout(()=>{
   zoomCollage();
 },9000);
}


// ===== ZOOM COLLAGE EFFECT =====

function zoomCollage(){
 let imgs=document.querySelectorAll("#photoContainer img");

 imgs.forEach((img,index)=>{
   setTimeout(()=>{
     img.style.transform="scale(2)";
   }, index*40);
 });

 // Fade to black
 setTimeout(()=>{
   document.getElementById("photoSection").classList.add("hidden");
   document.getElementById("blackTransition").classList.remove("hidden");

   setTimeout(()=>{
     showPoster();
   },2000);

 },4000);
}


// ===== SHOW POSTER =====

function showPoster(){
 document.getElementById("blackTransition").classList.add("hidden");
 document.getElementById("inviteSection").classList.remove("hidden");

 setTimeout(()=>{
   startEvents();
 },9000);
}


// ===== EVENT SEQUENCE =====

const events=[
"Welcome & Opening Ceremony",
"Fun Games & Interaction",
"Cultural Performances",
"Memory Sharing",
"Awards & Gratitude",
"Dinner",
"Final Emotional Goodbye"
];

function startEvents(){

 document.getElementById("inviteSection").classList.add("hidden");
 document.getElementById("eventSection").classList.remove("hidden");

 let display=document.getElementById("eventDisplay");
 let i=0;

 function nextEvent(){
   if(i<events.length){
     display.innerText=events[i];
     i++;
     setTimeout(nextEvent,3000);
   }
 }

 nextEvent();
}


