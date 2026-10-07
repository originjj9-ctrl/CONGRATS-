const screens = [...document.querySelectorAll(".screen")];
const dots = [...document.querySelectorAll(".dot")];
let current = 0;

function showScreen(id, celebrate = false){
  const target = document.getElementById(id);
  if(!target) return;
  const index = screens.indexOf(target);
  screens.forEach(s => s.classList.toggle("active", s === target));
  dots.forEach((d,i) => d.classList.toggle("active", i === index));
  current = index;
  if(celebrate || id === "final") makeConfetti(id === "final" ? 90 : 45);
  target.scrollTop = 0;
}

document.querySelectorAll("[data-next]").forEach(btn=>{
  btn.addEventListener("click",()=>showScreen(btn.dataset.next, true));
});

dots.forEach(dot=>{
  dot.addEventListener("click",()=>showScreen(dot.dataset.next));
});

function makeConfetti(count=45){
  const box = document.getElementById("confetti");
  box.innerHTML = "";
  const pieces = ["#f6c85f","#48b9ff","#ffffff","#ff8fb3","#8de1b2"];
  for(let i=0;i<count;i++){
    const el=document.createElement("i");
    el.className="confetti-piece";
    el.style.left=(Math.random()*100)+"vw";
    el.style.setProperty("--x",(Math.random()*220-110)+"px");
    el.style.animationDuration=(2.2+Math.random()*2.2)+"s";
    el.style.animationDelay=(Math.random()*.35)+"s";
    el.style.background=pieces[Math.floor(Math.random()*pieces.length)];
    el.style.transform=`rotate(${Math.random()*360}deg)`;
    box.appendChild(el);
  }
  setTimeout(()=>box.innerHTML="",5000);
}

document.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight" && current<screens.length-1) showScreen(screens[current+1].id,true);
  if(e.key==="ArrowLeft" && current>0) showScreen(screens[current-1].id);
});

let touchX = null;
document.addEventListener("touchstart",e=>touchX=e.changedTouches[0].screenX,{passive:true});
document.addEventListener("touchend",e=>{
  if(touchX===null) return;
  const dx=e.changedTouches[0].screenX-touchX;
  if(Math.abs(dx)>60){
    if(dx<0 && current<screens.length-1) showScreen(screens[current+1].id,true);
    if(dx>0 && current>0) showScreen(screens[current-1].id);
  }
  touchX=null;
});
