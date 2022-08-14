import '../styles/Navbar.css'
import PS4Icon from "../img/playstation-icon-28-removebg-preview.png"

function Navbar() {
    return (   
        <header className="App-header">
          <img src={PS4Icon} className="ps_header_icon"></img>
          <a href="/"><h1>Home</h1></a>
          <a href="/stats"><h1>Statistics</h1></a>
          <a href="/friend"><h1>Friends</h1></a>
        </header>
    )
}

export default Navbar;