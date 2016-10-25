require("component-responsive-frame/child");
var social = require("./lib/social");
var dot = require("./lib/dot");
var flip = require("./lib/flip");
var closest = require("./lib/closest");

var fish_template = dot.compile(require("../partials/_fish_info.html"));
document.querySelector(".fish-info").innerHTML = fish_template(fishData["crab"]);

var fishlinks = document.querySelector(".fish-wrapper");
var selected = document.querySelector(".active-fish");

fishlinks.addEventListener("click", function(e) {
    var item = closest(e.target, (".fish-container"));
    if (!item) return;
    var previously = selected.querySelector(".fish-container");
    var previousImage = previously.querySelector(".fish");
    var image = item.querySelector(".fish");
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
    if (selected.getBoundingClientRect().top < 0) scroll(selected);
}, false);
