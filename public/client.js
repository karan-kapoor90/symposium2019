const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;

document.querySelector('#talkBtn').addEventListener('click', () => {
  console.log('Recog init');
  recognition.start();
});

recognition.onresult = function(data) {
	console.log('Result received from recog :: ',data.results[data.results.length-1][0].transcript);
}


recognition.addEventListener('result', (e) => {
  // console.log('Recog received');
  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;
  console.log('Result text is :: ',text);
  console.log('Confidence: ' + e.results[0][0].confidence);
  socket.emit('voiceInput',text);
  // We will use the Socket.IO here later…
});

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}

var socket = io.connect('http://129.213.159.129:32700');
 socket.on('connect', function(data) {
	socket.emit('join', 'Hello World from client');
 });
 socket.on('messages', function(data) {
    console.log('Socket message response : ',data);
});
socket.on('broad', function(data) {
	synthVoice(data);
	$('#future').append(data+ "<br/>");
});

 $('form').submit(function(e){
	 e.preventDefault();
	 var message = $('#chat_input').val();
	 socket.emit('messages', message);
 });