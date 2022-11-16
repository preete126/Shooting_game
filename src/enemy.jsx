    /**@type {HTMLCanvasElement} */
export default class Enemy_ {
    constructor(x,y,image) {
        this.x = Math.random() * x * 15 ;
        this.y =  y;
        this.spriteW = 60;
        this.spriteH = 83;
        this.width = 73;
        this.height = 83;
        this.image = image;
        this.Enemy_speed = Math.random() * 1 
        this.frame = 1
        this.speed = 0;
        this.movingSpeed = 25;
        this.animation = []
        this.enemySprite = [
            {
                name:"fire",
                frame:4,
                E_width:73
              },
              {
                name:"guide",
                frame:4,
                E_width:68
              },
              {
                name:"run",
                frame:6,
                E_width:63
              },
              {
                name:"crouch",
                frame:4,
                E_width:60
              },
              {
                name:"walk",
                frame:5,
                E_width:68
              }
             
        ]
        this.enemySprite.forEach((state, index)=>{
            let frame = {
                loc:[]
            }
            for (let i = 0; i < state.frame ; i++) {
                let X = i * state.E_width;
                let Y = index * this.spriteH;
                frame.loc.push({x:X, y:Y, E_width:state.E_width});
                
            }
            this.animation[state.name] = frame;
        })
      //  console.log(this.animation)

    }
    update(){
      this.speed++
      this.x == 0 && this.x > -1 ? this.x = 0 : this.x--
      // if (this.x == 0) {
      //   this.x =  0 
      // }else{
      //   this.x -- ;
      // }
      
    }
    draw(context){
        let sprite = this.animation["run"].loc
        let position = Math.floor(this.speed/this.movingSpeed) % sprite.length;
        let deduceX = (position + 1) * sprite[position].E_width
        let deduceY = sprite[position].y

        context.drawImage(this.image,400 - deduceX ,deduceY,sprite[position].E_width,this.spriteH,this.x, this.y, this.width,this.height)
    }
}