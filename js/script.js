var _ctx = null;
var _atlas = null;
var _assets = [];

function init(){
    if(isCanvasSupported){
        setupCanvas();
    }
    //loads ASSETS
    loadAssetSource('/img/sp.png');
    loadAssets();
}

//check for canvas support on the browser
function isCanvasSupported(){
    return !!document.createElement('canvas').getContext;
}

//sets up the canvas in a full window space
function setupCanvas(){
    var b = document.getElementsByTagName('body');
    var c = document.createElement('canvas');
    b[0].appendChild(c);
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    _ctx = c.getContext('2d');
}

//loads an atlas
function loadAssetSource(source){
    var img = new Image();
    img.onload = function(){
        console.log('loaded: ' + this.src);
        _atlas = this;
    };
    img.src = source;    
}

//extracts the asset info from the atlas
function loadAssets(){
    var req = new XMLHttpRequest();
    req.addEventListener('load', reqListener);
    req.open('GET', '/img/sp.json');
    req.send();
    function reqListener(){
        //console.log(this.responseText);
        _spAssets = JSON.parse(this.responseText);

        for(f = 0; f < _spAssets.frames.length; f++){
            var cf = _spAssets.frames[f];
            _assets.push(new atlasAsset(cf.filename, cf.frame.x, cf.frame.y, cf.frame.w, cf.frame.h, cf.cx, cf.cy));
        }
    }
}

//draws thye selected image from a selected atlas in the canvas
function drawImage(srcid, atlasInUse, x, y){
    for(i = 0; i < _assets.length; i++){
        if (_assets[i].id == srcid){
            var a = _assets[i];
            _ctx.drawImage(atlasInUse, a.x, a.y, a.w, a.h, x, y, a.w, a.h);
        }
    }
}
