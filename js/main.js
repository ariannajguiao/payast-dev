var vid = document.getElementById('exampleVideo');
var wrapper = document.getElementById('wrapper');
var canvas = document.getElementById('exampleCanvas');
var ctx = canvas.getContext('2d');

var ratio = window.devicePixelRatio || 1;
var vidWidth;
var vidHeight;

vid.addEventListener('loadedmetadata', function () {
    console.log('onloadedmetadata');
    vidWidth = vid.videoWidth;
    vidHeight = vid.videoHeight;

    // Adjust canvas size to match video
    canvas.width = vidWidth * ratio;
    canvas.height = vidHeight * ratio;
    canvas.style.width = vidWidth + 'px';
    canvas.style.height = vidHeight + 'px';

    drawingLoop();
});

vid.addEventListener('loadeddata', function () {
    console.log('onloadeddata');
    setVideoBgColor(vid, wrapper);
    vid.play();
});

function drawingLoop() {
    ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(drawingLoop);
}

function setVideoBgColor(vid, backgroundElement) {
    // draw first few pixels of video to a canvas
    // then get pixel color from that canvas
    var canvas = document.createElement("canvas");
    canvas.width = 8;
    canvas.height = 8;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(vid, 0, 0, 8, 8);

    var p = ctx.getImageData(0, 0, 8, 8).data;
    // Don't take the first pixel, use the fourth pixel for better accuracy
    backgroundElement.style.backgroundColor = "rgb(" + p[60] + "," + p[61] + "," + p[62] + ")";
}

window.onresize = function () {
    vidWidth = vid.videoWidth;
    vidHeight = vid.videoHeight;

    canvas.width = vid.offsetWidth * ratio;
    canvas.height = vid.offsetHeight * ratio;

    canvas.style.width = vid.offsetWidth + "px";
    canvas.style.height = vid.offsetHeight + "px";

    // Redraw canvas after resize
    ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
};
