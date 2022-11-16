import { useEffect } from "react";
import { useRef } from "react";
import './App.css'
import Image1 from "./assets/p5_bg.jpg";
import Image2 from "./assets/p6_bg.jpg";
import hero from "./assets/player (2).png"
import enemy from "./assets/opponent.png"
import Levels from "./Event";
import Enemy_ from "./enemy";



function App() {
  const canvas = useRef(null)
  const Herocanvas = useRef(null)
  const Enemycanvas = useRef(null)
  const ground_img5 = new Image()
  ground_img5.src = Image1
  const ground_img6 = new Image()
  ground_img6.src = Image2
 
  //player
  const Hero_image = new Image()
  Hero_image.src = hero
  const Hero_width = Herocanvas.width = 100
  const Hero_height = Herocanvas.height = 100
  let gameFrame = 0;
  let movingspeed = 7;
  let reset = 0;
  let playState = "run"

  //enemy
  const opponent = new Image()
  opponent.src = enemy
  const Enemy_width = Enemycanvas.width = 1100
  const Enemy_height = Enemycanvas.height = 100
  let Enemy_count = 50;
  let EnemyArray = []

  //background
  const width = canvas.width = 1260;
  const height = canvas.height = 480;
  let gameSpeed = 1;
  let rectW = 73;
  let rectH = 80;

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    animate(ctx)
    const ctx2 = Herocanvas.current.getContext("2d")
    Hero(ctx2)
    const ctx3 = Enemycanvas.current.getContext("2d")
    Enemy(ctx3)
  }, [])
 

  let level1 = new Levels(ground_img5, ground_img6, 0.5, gameSpeed);
 
  
  //enemy
  for (let e = 0; e < Enemy_count; e++) {
   EnemyArray.push(new Enemy_(Enemy_width,0,opponent))
    
  }



  //player
  let spriteAnimation = []
  let animationState = [
    {
      name:"fire",
      frame:4,
      H_width:73
    },
    {
      name:"guide",
      frame:5,
      H_width:63
    },
    {
      name:"run",
      frame:6,
      H_width:63
    },
    {
      name:"crouch",
      frame:4,
      H_width:63
    },
    {
      name:"walk",
      frame:4,
      H_width:63
    }
  ]

  
  animationState.forEach((value, index) => {
    let frames = {
      location : []
    }
    for (let I = 0; I < value.frame; I++) {
      let positionX = I * value.H_width
      let positionY = index * rectH
      frames.location.push({X:positionX, Y:positionY, H_width:value.H_width})
      
    }
    spriteAnimation[value.name] = frames
   
  });
 

 

  useEffect(()=>{
    window.addEventListener("keydown", function(ev){
      // console.log(ev.key)
      switch (ev.key) {
        case "s":
          playState = "fire"
          break;
      
        case "r":
          playState = "run"
          break;
      
        case "w":
          playState = "walk"
          break;
      
        case "c":
          playState = "crouch"
          break;
      
        default:
          break;
      }

    })
  })

  //background
  function animate(context) {
    context.clearRect(0, 0, width, height)
    if (playState == "run") {
      gameSpeed = 4;
    }else gameSpeed = 1;
    level1.draw(context)
    level1.update(gameSpeed)
    requestAnimationFrame(() => animate(context))
  }

  //player
  function Hero(Hero_context) {
    Hero_context.clearRect(0, 0, Hero_width, Hero_height)

    let Sprite = spriteAnimation[playState].location
    if(playState === "walk") movingspeed = 30;
    else movingspeed = 7;
    let position = Math.floor(gameFrame/movingspeed) % Sprite.length;
    // console.log(position + 1)
    if (playState == "crouch") {
      reset++
      position = 3
      if( reset == 105 ) reset = 0, playState = "walk";
    }
    let Xframe = Sprite[position].H_width * position;
    let Yframe = Sprite[position].Y;
    Hero_context.drawImage(Hero_image,Xframe, Yframe , Sprite[position].H_width, rectH, 0, 0, rectW, rectH)
    
    gameFrame++;
    requestAnimationFrame(() => Hero(Hero_context,))
  }


  //enemy
  function Enemy(Enemy_context) {
    Enemy_context.clearRect(0, 0, Enemy_width, Enemy_height)
    EnemyArray.forEach(value =>{
      value.update();
      value.draw(Enemy_context);
    })
    requestAnimationFrame(() => Enemy(Enemy_context))
  }

  //HealthBar
  let healthPoint = 100;

  let reader = 6 - (healthPoint / 100 * 6);





  return (
    <>
      <canvas ref={canvas} className="canvas" width={1260} height={480} ></canvas>
      <canvas ref={Herocanvas} className="canvas2" width={100} height={100}  ></canvas>
      <canvas ref={Enemycanvas} className="canvas3" width={1100} height={100} style={{border:"1px solid black"}} ></canvas>
      <main>
        <main className="Addup">
            <div className="count">BODYCOUNT: 27</div>
            <div className="score">SCORE: 125</div>
        </main>

        <main style={{ position: "absolute", bottom: "10%", left: "2%" }}>
          <div className="HealthBar">
            <div className="filler" style={{ width: `${healthPoint}%` }}></div>
            {reader} / 6
          </div>
        </main>

        <div className="Triger">Exit</div>
        <div className="Triger" onClick={()=> playState = "crouch"} style={{ right: "10%", bottom: "16%" }}>Crouch</div>
        <div className="Triger" onClick={()=> playState = "walk"} style={{ bottom: "12%", right: "16%" }}>walk</div>
        <div className="TrigerF" onClick={()=> playState = "fire"}>Fire</div>
        <div className="Triger" onClick={()=> playState = "run"} style={{ bottom: "0%", right: "18%" }}>Run</div>
      </main>
    </>
  );
}

export default App;