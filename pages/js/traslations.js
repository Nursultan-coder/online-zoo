const buttons = document.querySelectorAll(".facts-list button"),
      item = document.querySelectorAll(".facts-list li");
const itemList = document.querySelectorAll(".footer-nav li a");
buttons.forEach((button, i) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();

    if(item[i].classList.contains("active-item")) {
      item[i].classList.remove("active-item");
      button.innerHTML = '+';

    }else {
      item[i].classList.add("active-item");
      button.innerHTML = '-';
    }

  });


});


