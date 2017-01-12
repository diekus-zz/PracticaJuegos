var _ctx = null;
var sprite = null;

function init(){
    //check for cannvas support on the browser
    if(isCanvasSupported){
        setupCanvas();
    }
}

function isCanvasSupported(){
    return !!document.createElement('canvas').getContext;
}

function setupCanvas(){
    var b = document.getElementsByTagName('body');
    var c = document.createElement('canvas');
    b[0].appendChild(c);
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    _ctx = c.getContext('2d');
}

function drawImageOnCanvas(source){
    var img = new Image();
    img.onload = onImageLoad;
    img.src = source;
    
}

onImageLoad = function(){
    console.log('image loaded');
};

function requestResource(src){
    var req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("GET", src);
    req.send();
}

function reqListener(){
    console.log(this.responseText);
    sprite = JSON.parse(this.responseText);
}