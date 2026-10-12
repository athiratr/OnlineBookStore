


import { Input, Button, Card, Row, Col, Alert, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { loginRequest } from "../redux/users/usersaction";
import "../App.css"

function Login() {

  const username = useSelector((state) => state.user.username);
  const category = useSelector((state) => state.user.category);
  const islogin = useSelector((state) => state.user.islogin);
  const error = useSelector((state) => state.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  function handleChange(e) {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  }

  function handleLogin(e) {

    e.preventDefault();

    if (!login.username || !login.password) {
      message.error("Please enter username and password");
      return;
    }

    dispatch(
      loginRequest(
        login.username,
        login.password
      )
    );
  }

  useEffect(() => {

    console.log("islogin changed:", islogin);

    if (islogin) {

      setLogin({
        username: "",
        password: ""
      });

      if (category === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    }

  }, [islogin, category, navigate]);

  return (
    <div>

      <Card
        title="Please Login Here"
        className="home-login-card"
      >

        <form onSubmit={handleLogin}>

          <Row gutter={[0, 14]}>

            <Col span={24}>

              <Input
                name="username"
                value={login.username}
                placeholder="Username"
                autoComplete="off"
                size="large"
                onChange={handleChange}
              />

            </Col>

            <Col span={24}>

              <Input.Password
                name="password"
                value={login.password}
                placeholder="Password"
                autoComplete="off"
                size="large"
                onChange={handleChange}
              />

            </Col>

            {error && (
              <Col span={24}>

                <Alert
                  message={error}
                  type="error"
                  showIcon
                />

              </Col>
            )}

            <Col span={24}>

              <Button
                type="primary"
                block
                size="large"
                htmlType="submit"
              >
                Login
              </Button>

            </Col>

          </Row>

        </form>

        <p>
          Don't have an account?
      
        <Link to="/signup"> 
        <Button type="link"> Sign Up </Button> 
        </Link> </p> 
        </Card> 
        </div> ); 
        
        } export default Login;
