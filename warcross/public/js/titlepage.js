
let util = {};
util.post = function(url, fields) {
    let form = $('<form>', {
        action: url,
        method: 'post'
    });
    $.each(fields, function(key, val) {
         $('<input>').attr({
						 type: "hidden",
             name: key,
             value: val
         }).appendTo(form);
    });
    form.appendTo('body');
	form.submit();
} 

let basicTimeline = anime.timeline({
	loop: false,
	delay: 1000, 
	autoplay: false,
	duration: 2000,
});

basicTimeline.add({
	targets: ['#stage1', '#stage2'],
	easing: "easeOutExpo",
	translateY: -window.innerHeight/2*1.05,
});

let name = "zero"; 
let characterClass = "architect";
let lookForKeys = false;

let input = document.getElementById("username");
input.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		console.log("pressed enter");
		lookForKeys = true;
		name = document.getElementById("username").value;
		document.getElementById("usernameBoard").innerHTML = name;
		$("#stage2").css("visibility", "visible");
		basicTimeline.play();
		$("#username").css("display", "none");
		$(".title").css("visibility", "hidden");
		$(".warning").css("visibility", "hidden");
	}
});

function startGame(characterClass){
	util.post("/startGame", {"name":name,"characterClass":characterClass});
	// window.location.href="index.html?"+name + "&" + characterClass;
}

$( '#architect' ).click( function() { startGame(this.id); } );
$( '#shield' ).click( function() { startGame(this.id); } );
$( '#fighter' ).click( function() { startGame(this.id); } );
$( '#thief' ).click( function() { startGame(this.id); } );

$(document).on("keypress",function(e){
	console.log(e.which);
	if(lookForKeys){
		let KEY_CODE_TABLE = {
			"h": 72,
			"j": 74,
			"k": 75,
			"l": 76
		}
		if (e.which == KEY_CODE_TABLE.h)
			startGame("architect");
		if (e.which == KEY_CODE_TABLE.j)
				startGame("shield");
		if (e.which == KEY_CODE_TABLE.k)
				startGame("fighter");
		if (e.which == KEY_CODE_TABLE.l)
				startGame("thief");
	}
});

