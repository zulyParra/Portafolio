function move(id, final, labelId) {
  var width = 10;
  var progress = setInterval(frame, 30);

  function frame() {
    if (width >= final) {
      clearInterval(progress);
    } else {
      width++;
      id.style.width = width + "%";
      document.getElementById(labelId).innerHTML = width * 1 + "%";
    }
  }
}

window.onload = function () {

  setTimeout(function () {
    move(html5, 80, "label");
    move(javascript, 60, "label1");
    move(java, 50, "label2");
    move(boot, 80, "label3");
    move(css, 60, "label4");
    move(sql, 50, "label5");
    move(liferay, 30, "label6");
  }, 2000);

};

let startingLocation = window.pageYOffset;
window.onscroll = function () {
  let displacement = window.pageYOffset;
  if (startingLocation >= displacement) {
    document.getElementById('navbar').style.top = '0';
  } else {
    document.getElementById('navbar').style.top = '-100px';
  }
  startingLocation = displacement;
}

let animation = document.querySelectorAll(".animationLeft");
let animationRight = document.querySelectorAll(".animationRight");

function showExperience() {
  let topInitial = window.pageYOffset;
  for (let i = 0; i < animation.length; i++) {
    let heightAnimation = animation[i].getBoundingClientRect().top;
    if ((heightAnimation + 1500) < topInitial) {
      animation[i].classList.add('animation-goRight');
    }
  }
  for (let i = 0; i < animationRight.length; i++) {
    let heightAnimation = animationRight[i].getBoundingClientRect().top;
    if ((heightAnimation + 1500) < topInitial) {
      animationRight[i].classList.add('animation-goLeft');
    }
  }
}

window.addEventListener('scroll', showExperience);