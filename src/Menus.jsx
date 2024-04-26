import "./menu.css"
import shot from "./assets/shooter.png"
import { useRef } from "react";
import hero from "./assets/player (2).png"
import Play from "./assets/playIcon.png"
import { useEffect } from "react";
import { Link } from "react-router-dom";


function Menus() {
    const player = useRef(null)
    const width = player.width = 150
    const height = player.height = 150
    const demo = new Image()
    demo.src = hero
    let x = -10

    useEffect(() => {
        const ctx = player.current.getContext("2d")
        Demo(ctx)
    }, [])


    function Demo(context) {
        context.clearRect(0, 0, width, height)
        let p = Math.floor(x / 25) % 2 - 1;
        x++;


        context.drawImage(demo, p, 80, 70, 80, 0, 0, width, height)

        requestAnimationFrame(() => Demo(context))
    }

    return (
        <section className="Land">
            <main className="header">
                <nav className="nav">
                    ELIMINATE
                    <img src={shot} width={100} height={100} alt="" />
                    All
                    ENEMIES
                </nav>

            </main>
            <canvas ref={player} width={150} height={150} className="Player"></canvas>
            <main style={{display:"flex", justifyContent:"space-evenly", marginTop:"4em", alignItems:"center"}}>
                <div className="container">
                    <div>Play Game</div>
                    <Link to={'/Eliminate all enemies'}>
                        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "100%" }}><img src={Play} width={100} height={100} alt="" /></div>
                    </Link>
                </div>
                <div style={{ color: "white" }} className="keys">
                    <h1>Keys:</h1>
                    <div><span>Walk </span> ➡ w</div>
                    <div><span>Run </span> ➡  r</div>
                    <div><span>Fire </span> ➡ s</div>
                    <div><span>Crouch </span> ➡ c</div>
                </div>
            </main>
            {/* <main style={{ display: "flex", justifyContent: "space-around", paddingLeft: "5rem", marginTop: "-80px" }}>

                <div className="control">
                    <button style={{ backgroundColor: "orange", color: "white", borderRadius: "4px", paddingLeft: "5px", paddingRight: "5px", fontSize: "20px" }}>on</button>
                    <button style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white", borderRadius: "4px", paddingLeft: "5px", paddingRight: "5px", fontSize: "20px" }}>off</button>
                </div>
            </main> */}


        </section>
    );
}

export default Menus;