require("component-responsive-frame/child");
var social = require("./lib/social");
var dot = require("./lib/dot");

// store the x,y coordinates of the target
var target = document.getElementById("stick-active-fish");
var xT = target.offsetLeft+500;
var yT = target.offsetTop+200;
var xT_orig = target.offsetLeft;
var yT_orig = target.offsetTop;

var fish_template = dot.compile(require("../partials/_fish_info.html"));
//
// document.getElementById("stick-me-fish").addEventListener("click",function(){
//   console.log("we did this thing");
//   // document.getElementsByClassName("fish-info").style.padding = "50px";
//   var list = document.getElementsByClassName("fish-container"));
// });

var fishList = document.getElementsByClassName("fish-container");
for (var i=0; i<fishList.length; i+=1) {
  fishList[i].addEventListener("click",function(){
    var elemID = this.id;
    var former_fish = document.getElementsByClassName("active-fish-location")[0];

    if (this == former_fish) {
      console.log("this is already the active fish!");
    } else {
      document.querySelector(".fish-info").innerHTML = fish_template(fishData[elemID]);

      // move image to the "active" location
      this.style.left = "60%";
      this.style.top = "200px";
      this.style.width = "300px";
      this.style.position = "absolute";

      // move current active image back to the heading

      if (former_fish) {
        former_fish.style.position = "relative";
        former_fish.style.left = "0px";
        former_fish.style.top = "0px";
        former_fish.classList.remove("active-fish-location");
      }

      this.classList.add("active-fish-location");
    }

  }, false);
};

// window.onscroll = function() {activate()};
//
// function activate() {
//   var sticker = document.getElementById('stick-me-fish');
//   var sticker_ph = document.getElementById('stick-ph-fish');
//   var window_top = document.body.scrollTop;
//   var div_top = document.getElementById('stick-here-fish').getBoundingClientRect().top + window_top;
//   if (window_top > div_top) {
//       sticker.classList.add('fixed-fish');
//       sticker_ph.style.display = 'block'; // puts in a placeholder for where sticky used to be for smooth scrolling
//   } else {
//       sticker.classList.remove('fixed-fish');
//       sticker_ph.style.display = 'none'; // removes placeholder
//   }
// }
