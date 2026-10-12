
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { logout } from "../redux/users/usersaction";

function AdminTopBar() {

  const username = useSelector((state) => state.user.username);
  const full_name = useSelector((state) => state.user.full_name);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="admintopbar">

     <span><h2>Welcome {full_name}</h2></span>

      <div >
         <Button
          onClick={handleLogout}
          icon={<LogoutOutlined />}
        >
          Logout
        </Button>

      </div>

    </div>
  );
}

export default AdminTopBar;

