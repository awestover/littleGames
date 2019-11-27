/*
theland-conquest
BY LINCOLN AND ALEK
*/

// set up everything
function setup()
{
	initVars();
	let canvas = createCanvas(windowWidth*0.2, windowHeight*0.3);
	canvas.parent("canvas");
	setInterval(updates, 1000);
	dogPic = loadImage("imgs/dog1.png");

  // ajax test
	try {
		$.post('/conquest-data', function(data) {
			console.log(data);
		});
	}
	catch (error){
		console.log("Server data storage, comming soon (if I feel like it)");
		console.log(error);
	}


}

function draw()
{
	background(255,0,200);
	updateText();

	image(dogPic, width*random()*0.8, height*random()*0.8);
}
