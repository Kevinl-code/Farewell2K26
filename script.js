// ===== TIME LOCK =====

const revealTime = new Date("Feb 24, 2026 10:38:00").getTime();
const timer = document.getElementById("timer");

const interval = setInterval(()=>{
 let now = new Date().getTime();
 let diff = revealTime - now;

 if(diff <= 0){
   clearInterval(interval);
   document.getElementById("lockScreen").style.display="none";
   startPhotoCinematic();
 }

 let d=Math.floor(diff/(1000*60*60*24));
 let h=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
 let m=Math.floor((diff%(1000*60*60))/(1000*60));
 let s=Math.floor((diff%(1000*60))/1000);

 timer.innerHTML=`${d}d ${h}h ${m}m ${s}s`;
},1000);


// ===== PHOTO CINEMATIC =====

function startPhotoCinematic(){
 document.getElementById("photoSection").classList.remove("hidden");

 const container = document.getElementById("photoContainer");

 for(let i=1;i<=56;i++){

   let img=document.createElement("img");
   img.src=`images/seniors/${i}.jpg`;
   img.classList.add("photo");

   img.style.left=Math.random()*window.innerWidth+"px";
   img.style.top=Math.random()*window.innerHeight+"px";

   container.appendChild(img);

   // Travel in
   setTimeout(()=>{
     img.style.opacity="1";
     img.style.transform="scale(1)";
   },200*i);

   // Move to center
   setTimeout(()=>{
     img.style.left="50%";
     img.style.top="50%";
     img.style.transform="translate(-50%,-50%) scale(1.3)";
   },4000);

   // Scatter with neon glow
   setTimeout(()=>{
     img.style.left=Math.random()*window.innerWidth+"px";
     img.style.top=Math.random()*window.innerHeight+"px";
     img.style.transform="scale(1)";
     img.classList.add("glow");
   },7000);
 }

 // After full cinematic
 setTimeout(()=>{
   document.getElementById("photoSection").classList.add("hidden");
   showInvitation();
 },12000);
}


// ===== INVITATION =====

function showInvitation(){
 document.getElementById("inviteSection").classList.remove("hidden");

 setTimeout(()=>{
   document.getElementById("inviteSection").classList.add("hidden");
   showEvents();
 },8000);
}


// ===== EVENTS SEQUENCE =====

const events=[
"Welcome & Opening Ceremony",
"Fun Games & Interaction",
"Cultural Performances",
"Memory Sharing",
"Awards & Gratitude",
"Dinner",
"Final Emotional Goodbye"
];

function showEvents(){
 document.getElementById("eventSection").classList.remove("hidden");

 const display=document.getElementById("eventDisplay");
 let i=0;

 function nextEvent(){
   if(i<events.length){
     display.style.opacity="0";

     setTimeout(()=>{
       display.innerText=events[i];
       display.style.opacity="1";
       i++;
     },500);

     setTimeout(nextEvent,3000);
   }
 }

 nextEvent();
}

