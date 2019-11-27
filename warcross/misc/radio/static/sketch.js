
console.log("asdf");

let aud = new Audio("rain.mp3");
aud.addEventListener("loadeddata", () => {
	aud.play();
	aud.currentTime = aud.duration/5;
});

// Fix up prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

function loadDogSound(url) {
  var request = new XMLHttpRequest();
  request.open('GET', "file:///file:///Users/alekwestover/Desktop/warcross/radio/rain.mp3", true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      dogBarkingBuffer = buffer;
			console.log(buffer);
    }, onError);
  }
  request.send();
}
