// ===== TIME LOCK SYSTEM =====



const revealTime = new Date("Feb 23, 2026 01:05:00").getTime();

const timer = document.getElementById("timer");



setInterval(()=>{

 let now = new Date().getTime();

 let diff = revealTime - now;



 if(diff <= 0){

   document.getElementById("lockScreen").style.display="none";

   startReveal();

 }



 let d=Math.floor(diff/(1000*60*60*24));

 let h=Math.floor((diff%(1000*60*60*24))/(1000*60*60));

 let m=Math.floor((diff%(1000*60*60))/(1000*60));

 let s=Math.floor((diff%(1000*60))/1000);

 timer.innerHTML=`${d}d ${h}h ${m}m ${s}s`;

},1000);



// ===== MASTER REVEAL FLOW =====



function startReveal(){

 document.getElementById("curtainStage").classList.add("open");



 setTimeout(()=>show("titleSection"),3000);

 setTimeout(()=>show("seniorsSection"),6000);

 setTimeout(()=>flyPhotos(),6500);

 setTimeout(()=>show("profSection"),12000);

 setTimeout(()=>show("inviteSection"),15000);

 setTimeout(()=>show("agendaSection"),18000);

 setTimeout(()=>show("videoSection"),21000);

 setTimeout(()=>show("finalSection"),26000);

}



function show(id){

 document.getElementById(id).classList.remove("hidden");

}



// ===== SENIORS PHOTO FLIGHT =====



function flyPhotos(){

 let container=document.getElementById("photoFlight");



 for(let i=1;i<=55;i++){

  let img=document.createElement("img");

  img.src=`images/seniors/${i}.jpg`;

  img.style.left=Math.random()*window.innerWidth+"px";

  img.style.top=Math.random()*window.innerHeight+"px";

  container.appendChild(img);



  setTimeout(()=>{

   img.style.left="50%";

   img.style.top="50%";

  },500+i*50);

 }



 setTimeout(()=>makeCollage(),5000);

}



// ===== COLLAGE FORMATION =====



function makeCollage(){

 let collage=document.getElementById("collage");

 for(let i=1;i<=55;i++){

  let img=document.createElement("img");

  img.src=`images/seniors/${i}.jpg`;

  img.style.width="100%";

  collage.appendChild(img);

 }

}



// ===== AGENDA MODAL =====



const agendaData=[

"Welcome & Opening Ceremony",

"Fun Games & Interaction",

"Cultural Performances by Students",

"Memory Sharing Session",

"Awards & Gratitude",

"Dinner",

"Final Emotional Goodbye"

];



function openAgenda(i){

 document.getElementById("modal").style.display="flex";

 document.getElementById("modalContent").innerHTML=`<h2>${agendaData[i]}</h2><p>Special moments planned for you 🤍</p>`;

}



document.getElementById("modal").onclick=()=>{

 document.getElementById("modal").style.display="none";

};



