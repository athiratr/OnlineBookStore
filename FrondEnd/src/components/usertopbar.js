import { Button, Space } from "antd";
import {
    ShoppingCartOutlined,
    LogoutOutlined,
    HistoryOutlined
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/users/usersaction";

function UserTopBar() {

    const username = useSelector((state) => state.user.username);
    const full_name = useSelector((state) => state.user.full_name);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="usertopbar">

            

            <div>
            

                    <span><h3>Welcome {full_name}</h3>  </span>
                        
                  

              </div>       

                    <Button
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>

               
           

        </div>
    );
}

export default UserTopBar;