// require("component-responsive-frame/child");
var social = require("./lib/social");
var dot = require("./lib/dot");
var flip = require("./lib/flip");
var closest = require("./lib/closest");

window.addEventListener("orientationchange", function() {
  window.location.reload();
}, false);

var fish_template = dot.compile(require("../partials/_fish_info.html"));
document.querySelector(".fish-info").innerHTML = fish_template(fishData["crab"]);

var fishlinks = document.querySelector(".fish-wrapper");
var selected = document.querySelector(".active-fish");

fishlinks.addEventListener("click", function(e) {
    var item = closest(e.target, (".fish-container"));
    if (!item) return;
    var previously = selected.querySelector(".fish-container");
    var previousImage = previously.querySelector(".fish");
    var previousImageIMG = previousImage.querySelector("img");
    var newIMG = previousImageIMG.src.split("/")[5];
    console.log(newIMG);
    console.log(newIMG.substring(0,5));
    if (newIMG.substring(0,5) != "white") {
      var img = document.createElement("img");
      img.src = "../assets/graphics/white"+newIMG;
      previousImage.replaceChild(img, previousImageIMG);
    }
    var image = item.querySelector(".fish");
    var imageIMG = image.querySelector("img");
    var bigimage = imageIMG.src.split("/")[5];
    if (bigimage.substring(0,5) == "white") {
      var img = document.createElement("img");
      img.src = "../assets/graphics/" + bigimage.substring(5,bigimage.length);
      image.replaceChild(img, imageIMG);
    }
    flip(image, function() {
      selected.removeChild(previously);
      previously.classList.add("wiggle-even");
      fishlinks.appendChild(previously);
      fishlinks.removeChild(item);
      previously.classList.add("wiggle");

      selected.appendChild(item);
      item.classList.remove("wiggle-even");
      item.classList.remove("wiggle-odd");
      document.querySelector(".fish-info").innerHTML = fish_template(fishData[item.id]);
    });
    // if (selected.getBoundingClientRect().top < 0) scroll(selected);
}, false);

// document.getElementById('stick-me-fish').style.height = document.getElementById('stick-ph-fish').style.height;

var targetOffset, currentPosition,
    body = document.body,
    animateTime = 900;

window.onscroll = function() {activate()};

function activate() {
  var sticker = document.getElementById('stick-me-fish');
  var sticker_ph = document.getElementById('stick-ph-fish');
  var window_top = document.body.scrollTop;
  var sticker_stop = document.getElementById('stop-stick-here').getBoundingClientRect().top + window_top - 100;
  var div_top = document.getElementById('stick-here-fish').getBoundingClientRect().top + window_top;
  if ((window_top > div_top) && (window_top < sticker_stop)) {
    sticker.classList.add('fixed-fish');
    sticker_ph.style.height = '131px';
    sticker_ph.style.display = 'block'; // puts in a placeholder for where sticky used to be for smooth scrolling
  } else {
    sticker.classList.remove('fixed-fish');
    sticker_ph.style.display = 'none'; // removes placeholder
  }
}

function getPageScroll() {
  var yScroll;

  if (window.pageYOffset) {
    yScroll = window.pageYOffset;
  } else if (document.documentElement && document.documentElement.scrollTop) {
    yScroll = document.documentElement.scrollTop;
  } else if (document.body) {
    yScroll = document.body.scrollTop;
  }
  return yScroll;
}

// var sec = document.getElementsByClassName('fixed-fish')[0];
var sec = document.getElementById("stick-me-fish");
sec.addEventListener('click', function (event) {

  var sticker = document.getElementById('stick-me-fish');
  sticker.classList.remove('fixed-fish');
  var sticker_ph = document.getElementById('stick-ph-fish');
  sticker_ph.style.display = 'none';

  if (screen.width <= 480) {
    var targetOffset = document.getElementById("stick-here-fish").offsetTop-20;
  } else {
    var targetOffset = document.getElementById("stick-here-fish").offsetTop-200;
  }
  var currentPosition = getPageScroll();

  // body.classList.add('in-transition');

  for (var i = 0; i < scroll.length; i++) {
      body.style.WebkitTransform = "translate(0, " + (currentPosition - targetOffset) + "px)";
      body.style.MozTransform = "translate(0, " + (currentPosition - targetOffset) + "px)";
      body.style.transform = "translate(0, " + (currentPosition - targetOffset) + "px)";
  }

  window.setTimeout(function () {
    body.classList.remove('in-transition');
    body.style.cssText = "";
    window.scrollTo(0, targetOffset);
  }, animateTime);

  event.preventDefault();

}, false);

// photo gallery ---------------------------------------------------------------

// templates for the two interactives
var slideshow_template = dot.compile(require("../partials/_slideshow.html"));

var photo1 = {
  url: "http://ww2.hdnux.com/photos/54/11/64/11622639/3/2000x1000.jpg",
  caption: "Insert caption here. ",
  credit: "Gabrielle Lurie"
};
var photo2 = {
  url: "http://ww2.hdnux.com/photos/54/11/64/11622618/3/2000x1000.jpg",
  caption: "Insert caption here. ",
  credit: "Gabrielle Lurie"
};
var photo3 = {
  url: "http://ww2.hdnux.com/photos/54/11/64/11622730/3/2000x1000.jpg",
  caption: "Insert caption here. ",
  credit: "Gabrielle Lurie"
};
var photo4 = {
  url: "http://ww2.hdnux.com/photos/54/11/64/11622727/3/2000x1000.jpg",
  caption: "Insert caption here. ",
  credit: "Gabrielle Lurie"
};
var photo5 = {
  url: "http://ww2.hdnux.com/photos/54/11/64/11622645/3/2000x1000.jpg",
  caption: "Insert caption here. ",
  credit: "Gabrielle Lurie"
};
var photo6 = {
  url: "http://ww2.hdnux.com/photos/54/11/64/11622649/3/2000x1000.jpg",
  caption: "Insert caption here. ",
  credit: "Gabrielle Lurie"
};

document.querySelector("#photo_g10").innerHTML = slideshow_template(photo1);
document.querySelector("#photo_g11").innerHTML = slideshow_template(photo2);
document.querySelector("#photo_g12").innerHTML = slideshow_template(photo3);
document.querySelector("#photo_g13").innerHTML = slideshow_template(photo4);
document.querySelector("#photo_g14").innerHTML = slideshow_template(photo5);
document.querySelector("#photo_g15").innerHTML = slideshow_template(photo6);

// photo gallery #4
var gallery_idx = 0;
// set up clicking to update map interactive on mobile
document.getElementById("scroll-right-gallery").addEventListener("click", function() {
  gallery_idx = gallery_idx+1;
  $(".photo_g1").removeClass("active");
  $("#photo_g1"+gallery_idx).addClass("active");
  if (gallery_idx == 5) {
    $("#scroll-right-gallery").addClass("last");
  } else {
    $("#scroll-right-gallery").removeClass("last");
  };
  if (gallery_idx == 0) {
    $("#scroll-left-gallery").addClass("first");
  } else {
    $("#scroll-left-gallery").removeClass("first");
  };
});
document.getElementById("scroll-left-gallery").addEventListener("click", function() {
  gallery_idx = gallery_idx-1;
  $(".photo_g1").removeClass("active");
  $("#photo_g1"+gallery_idx).addClass("active");
  if (gallery_idx == 5) {
    $("#scroll-right-gallery").addClass("last");
  } else {
    $("#scroll-right-gallery").removeClass("last");
  };
  if (gallery_idx == 0) {
    $("#scroll-left-gallery").addClass("first");
  } else {
    $("#scroll-left-gallery").removeClass("first");
  };
});
