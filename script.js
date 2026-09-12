const start = document.getElementById("startStory");
const story = document.getElementById("story");
const backTop = document.getElementById("backTop");
const timeline = document.querySelector(".timeline");
const progress = document.getElementById("timelineProgress");

start.addEventListener("click", () => story.scrollIntoView({behavior:"smooth"}));
backTop.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.15});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

function updateProgress(){
  const rect = timeline.getBoundingClientRect();
  const cursor = window.innerHeight * .5;
  const total = rect.height;
  const passed = cursor - rect.top;
  const pct = Math.max(0, Math.min(1, passed / total));
  progress.style.height = `${pct * 100}%`;
}
window.addEventListener("scroll", updateProgress, {passive:true});
window.addEventListener("resize", updateProgress);
updateProgress();
