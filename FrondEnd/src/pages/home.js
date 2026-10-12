import Login from "./login";
import { Typography } from "antd";

function Home() {
  return (
    <div className="homePage">
    <div className="homeLeft">
        <Typography.Title level={1}>BookVerse!</Typography.Title>
        <p><b>Find your next great read...</b></p>
      </div>

      {/* Right side - Login area */}
      <div className="loginArea">
        <Login />
      </div>

    </div>
  );
}

export default Home;