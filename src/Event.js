export default class Levels {
    constructor(image1,image2, speedModifier, speed){
        this.x = 0;
        this.y = 0;
        this.width = 1440;
        this.height = 480;
        this.x2 = this.width
        this.speedModifier = speedModifier;
        this.speed = speed * this.speedModifier;
        this.image1 = image1;
        this.image2 = image2;
    }
    update(speed){
        this.speed = speed * this.speedModifier;
        if(this.x <= -this.width){
            this.x = this.width + this.x2 - speed
        }
        if(this.x2 <= -this.width){
            this.x2 = this.width + this.x - speed
        }
        this.x = Math.floor(this.x - this.speed)
        this.x2 = Math.floor(this.x2 - this.speed)
    }
    draw(context){
        context.drawImage(this.image1, this.x, this.y, this.width, this.height)
        context.drawImage(this.image2, this.x2, this.y, this.width, this.height)
    }
}