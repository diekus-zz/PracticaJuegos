var _ctx = null;
var _gAtlases = []
var _assets = [];

function init(){
    if(isCanvasSupported){
        setupCanvas();
    }
    //loads ASSETS
    loadAtlas('img/sp', '.png');
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

//extracts the asset info from the atlas
function loadAtlas(src, imgFormat){
    //loads the atlas image
    var img = new Image();
    img.onload = function(){
        console.log('loaded: ' + this.src);
    };
    img.src = src + imgFormat;  
    //loads the JSON file
    var req = new XMLHttpRequest();
    req.addEventListener('load', reqListener);
    req.open('GET', src + '.json');
    req.send();
    function reqListener(){
        _spAssets = JSON.parse(this.responseText);
        for(f = 0; f < _spAssets.frames.length; f++){
            var cf = _spAssets.frames[f];
            var str = src.substring(src.lastIndexOf('/')+1);
            _assets.push(new atlasAsset(cf.filename, cf.frame.x, cf.frame.y, cf.frame.w, cf.frame.h, cf.cx, cf.cy, str));
            if(_gAtlases[str]==null){
                _gAtlases[str]=[];
                _gAtlases[str].atlas = img;
                _gAtlases[str].push(cf.filename);
            }
            else
                _gAtlases[str].push(cf.filename);
        }
    }
}

//draws an image to the canvas
function drawImage(srcid, x, y){
    var atl = getAtlas(srcid);
    __drawImageInternal(srcid, atl, x, y);
}

//gets the image atlas that has the resource
function getAtlas(res){
    var r = null;
    for (i = 0; i < _assets.length; i++){
        if(_assets[i].id == res){
            r = _assets[i].atlasName;
            break;
        }
    }
    return _gAtlases[r].atlas;
}

//draws thye selected image from a selected atlas in the canvas
function __drawImageInternal(srcid, atlasInUse, x, y){
    for(i = 0; i < _assets.length; i++){
        if (_assets[i].id == srcid){
            var a = _assets[i];
            _ctx.drawImage(atlasInUse, a.x, a.y, a.w, a.h, x+a.w, y+a.h, a.w, a.h);
        }
    }
}
