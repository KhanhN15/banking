import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Liên hệ",
    path: "/lien-he",
  },
];

const Header = () => {
  const isLogged = JSON.parse(localStorage.getItem('isLogged'));
  const user = useSelector((state) => state.user.userInfor);
  const isAdmin = user && user.roleId == 0 ? false : true;
  const handleLogout = async () => {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <header className="header-one">
      {/* Start header menu area */}
      <div id="sticker" className="header-area hidden-xs">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="row">
                {/* logo start */}
                <div className="col-md-3 col-sm-3">
                  <div className="logo">
                    {/* Brand */}
                    <Link to={"/"} className="navbar-brand page-scroll">
                      <img
                        width={60}
                        src="https://haitrieu.com/wp-content/uploads/2022/01/Logo-Agribank-V.png"
                        alt
                      />
                    </Link>
                  </div>
                  {/* logo end */}
                </div>
                <div className="col-md-9 col-sm-9">
                  <div className="header-right-link">
                    {/* search option end */}
                    {isLogged ? (
                      <Link
                        onClick={handleLogout}
                        className="s-menu"
                        to="/login"
                      >
                        Đăng xuất
                      </Link>
                    ) : (
                      <Link className="s-menu" to="/login">
                        Đăng nhập
                      </Link>
                    )}
                  </div>
                  {/* mainmenu start */}
                  <nav className="navbar navbar-default">
                    <div
                      className="collapse navbar-collapse"
                      id="navbar-example"
                    >
                      <div className="main-menu">
                        <ul className="nav navbar-nav navbar-right">
                          {mainNav.map((item, index) => {
                            return (
                              <li key={index}>
                                <Link className="pages" to={item.path}>
                                  {item.display}
                                </Link>
                              </li>
                            );
                          })}
                          {isLogged && isAdmin && (
                            <li>
                              <Link className="pages" to="/admin/dashboard">
                                Quản Lí
                              </Link>
                            </li>
                          )}
                          {isLogged && (
                            <li>
                              <Link className="pages" to="#">
                                {user && user.fullName}
                              </Link>

                              <ul className="sub-menu">
                                <li>
                                  <Link to="#">
                                    Số thẻ: {user && user.CreditCard.numberCard}
                                  </Link>
                                  <Link to="/quan-ly-tai-khoan">
                                    Quản lý tài khoản
                                  </Link>
                                  <Link to="/chuyen-tien">Chuyển tiền</Link>
                                </li>
                              </ul>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </nav>
                  {/* mainmenu end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End header menu area */}
      {/* Start mobile menu area */}
      <div className="mobile-menu-area hidden-lg hidden-md hidden-sm">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mobile-menu">
                <div className="logo">
                  <a href="index.html">
                    <img src="img/logo/logo2.png" alt />
                  </a>
                </div>
                <nav id="dropdown">
                  <ul>
                    <li>
                      <a className="pages" href="index.html">
                        Home
                      </a>
                      <ul className="sub-menu">
                        <li>
                          <a href="index.html">Home 01</a>
                        </li>
                        <li>
                          <a href="index-2.html">Home 02</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="about.html">About us</a>
                    </li>
                    <li>
                      <a className="pages" href="#">
                        Pages
                      </a>
                      <ul className="sub-menu">
                        <li>
                          <a href="team.html">team</a>
                        </li>
                        <li>
                          <a href="faq.html">FAQ</a>
                        </li>
                        <li>
                          <a href="pricing.html">Pricing</a>
                        </li>
                        <li>
                          <a href="review.html">Reviews</a>
                        </li>
                        <li>
                          <a href="terms.html">Terms &amp; Conditions</a>
                        </li>
                        <li>
                          <a href="login.html">Login</a>
                        </li>
                        <li>
                          <a href="signup.html">Register</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="pages" href="#">
                        Dashboard
                      </a>
                      <ul className="sub-menu">
                        <li>
                          <a href="a-dashboard.html">Dashboard</a>
                        </li>
                        <li>
                          <a href="a-send-money.html">Send Money</a>
                        </li>
                        <li>
                          <a href="a-request-money.html">Request Money</a>
                        </li>
                        <li>
                          <a href="a-withdraw-money.html">Withdraw Money</a>
                        </li>
                        <li>
                          <a href="a-deposite-money.html">Deposite Money</a>
                        </li>
                        <li>
                          <a href="a-currency-change.html">Currency Exchange</a>
                        </li>
                        <li>
                          <a href="a-add-bank.html">Bank Account</a>
                        </li>
                        <li>
                          <a href="a-card-number.html">Card Number</a>
                        </li>
                        <li>
                          <a href="a-transection-log.html">Transection Log</a>
                        </li>
                        <li>
                          <a href="a-setting-money.html">Notifications</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="pages" href="#">
                        Blog
                      </a>
                      <ul className="sub-menu">
                        <li>
                          <a href="blog.html">Blog grid</a>
                        </li>
                        <li>
                          <a href="blog-sidebar.html">Blog Sidebar</a>
                        </li>
                        <li>
                          <a href="blog-details.html">Blog Details</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="contact.html">contacts</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End mobile menu area */}
    </header>
  );
};

export default Header;
