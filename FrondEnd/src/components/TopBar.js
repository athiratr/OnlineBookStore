import { Input, Button, Card } from "antd";
import { Link } from "react-router-dom";

function TopBar(){
    return(
        <div className="homePage">
            <div className="topLeft">
                <h2>BookVerse!</h2>
                <p>Find your next great read...</p>
            </div>
           
        <nav className="homeButtons">
        <Link to="/login">
          <Button>Login</Button>
        </Link>

        <Link to="/signup">
          <Button>Register </Button>
        </Link>
        </nav>
      

            
        </div>
          
    )

}
export default TopBar