export default class Healthbar{
    constructor(x,y,w,h,maxHealth,color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.maxHealth = maxHealth;
        this.maxwidth = w;
        this.health = maxHealth;
        this.color = color;

    }
    show(context){
        context.lineWidth = 2;
        context.strokeStyle = "pink";
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
        context.strokeRect(this.x, this.y, this.maxwidth, this.h);
    }
    updateHeath(value){
        this.health = value;
        this.w = (this.health / this.maxHealth) * this.maxwidth;
        console.log(this.w)
    }
}
