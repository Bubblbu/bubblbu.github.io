/*jslint browser:true */
"use strict";

$(document).foundation();

$.get("https://api.icndb.com/jokes/random?limitTo=[nerdy]", function(data) {
    $("#chuck_norris").html("\"" + data.value.joke + "\"");
});

smoothScroll.init();

particlesJS.load("particles-js", "particles.json", function() {
    console.log("particles.js loaded - callback");
});
