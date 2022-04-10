import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usersApi from "../../api/usersApi";
import { login } from "../../store/slice/user";
import { useDispatch } from "react-redux";
import { getInfor } from "../../store/action/user";

const initialState = {
  phone: "",
  password: "",
};
const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialState);
  const history = useHistory();
  const { phone, password } = user;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    await usersApi
      .login(user)
      .then((res) => {
        if (res && res.data) {
          if (res.data.message.user.status == '0') {
            toast.error("Tài Khoản Chưa Được Kích Hoạt");
            return
          } else {
            toast.success("Đăng nhập thành công");
          localStorage.setItem("isLogged", true);
          localStorage.setItem("user", JSON.stringify(res.data.message));
          dispatch(getInfor(res.data.message.user.id));
          dispatch(login(res.data.message.user.roleId));
          history.push("/");
          }
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <div id="preloader"></div> */}
      <div className="login-area area-padding fix">
        <div className="login-overlay" />
        <div className="table">
          <div className="table-cell">
            <div className="container">
              <div className="row">
                <div className="col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8 col-xs-12">
                  <div className="login-form">
                    <h4 className="login-title text-center">Đăng nhập</h4>
                    <div className="row">
                      <form
                        onSubmit={handleLogin}
                        id="contactForm"
                        className="log-form"
                      >
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Số điện thoại"
                            value={phone}
                            onChange={handleChangeInput}
                            name="phone"
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={handleChangeInput}
                            name="password"
                          />
                        </div>

                        <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                          <button
                            type="submit"
                            id="submit"
                            className="slide-btn login-btn"
                          >
                            Đăng nhập
                          </button>
                          <div
                            id="msgSubmit"
                            className="h3 text-center hidden"
                          />
                          <div className="clearfix" />
                          <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                            <div className="clear" />

                            <div className="sign-icon">
                              <div className="acc-not">
                                Bạn chưa có tài khoản?{" "}
                                <Link to="/register">Đăng nhập</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
