// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Get the audio element
const audioElement = document.getElementById("audioElement");

// Create a media element source node
const track = audioContext.createMediaElementSource(audioElement);

// Connect the source node to the audio context's destination (speakers)
track.connect(audioContext.destination);

// Start playing the audio
audioElement.play();
