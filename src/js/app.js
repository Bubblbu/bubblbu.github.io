/*jslint browser:true */
"use strict";

$(document).foundation();

$.get( "http://api.icndb.com/jokes/random?limitTo=[nerdy]" , function(data) {
	$("#chuck_norris").html("\"" + data.value.joke + "\"");
});