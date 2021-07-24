/*accordion pannel*/
const accordionBtn = document.querySelectorAll(".facts__accordion-btn");

accordionBtn.forEach((btn) => btn.addEventListener("click", (event) => {
  event.target.classList.toggle("facts__accordion-btn_active");

  if(event.target.nextElementSibling.style.display =="block") {
    event.target.nextElementSibling.style.display ="none"
  } else {
    event.target.nextElementSibling.style.display ="block"
  }
}))

/*slider in other cams*/
const prev = document.querySelector(".other-cams__btn_left");
const next = document.querySelector(".other-cams__btn_right");
const carouselle = document.querySelector(".other-cams__carouselle");
const slider = document.querySelector(".other-cams__video");
const sliderItem = document.querySelector(".other-cams__iframe-descr");
let width = sliderItem.offsetWidth;

let gap = 40;
if(carouselle.offsetWidth < 1440 && carouselle.offsetWidth >= 600){
  gap = 30;
} else if (carouselle.offsetWidth < 600) {
  gap = 20;
}

window.addEventListener("resize", (event) => (width = sliderItem.offsetWidth));

next.addEventListener("click", (event) => {
  carouselle.scrollBy(width + gap, 0);
});

prev.addEventListener("click", (event) => {
  carouselle.scrollBy(-(width + gap), 0);
});

/*video liading in other cams*/

const links = document.querySelectorAll(".other-cams__video-link");
const mainVideo = document.querySelector(".main-cam__iframe");
const linkDivs = document.querySelectorAll(".other-cams__video-text");

linkDivs.forEach((linkDiv) => linkDiv.addEventListener("click", (event) => {
  let mainSrc = mainVideo.src;
  let mainVideoId = mainVideo.src.split("/");
  mainVideoId = mainVideoId[mainVideoId.length-1];
  mainVideo.src = event.target.previousElementSibling.dataset.src;
  event.target.previousElementSibling.src = `http://img.youtube.com/vi/${mainVideoId}/0.jpg`;
  event.target.previousElementSibling.dataset.src = mainSrc;

}));
