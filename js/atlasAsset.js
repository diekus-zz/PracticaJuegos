class atlasAsset{
    constructor(name, x, y, w, h, cx, cy, atlasName){
        this.id = name;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.cx = -w*.5;
        this.cy = -h*.5;
        this.atlasName = atlasName;
    }
}