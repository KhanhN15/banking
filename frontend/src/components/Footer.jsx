import React from "react";

const Footer = () => {
  return (
    <footer className="footer-1">
      <div className="footer-area">
        <div className="container">
          <div className="row">
            {/* Start column*/}
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="footer-content logo-footer">
                <div className="footer-head">
                  <div className="footer-logo">
                    <a className="footer-black-logo" href="#">
                      <img
                        width={70}
                        src="https://haitrieu.com/wp-content/uploads/2022/01/Logo-Agribank-V.png"
                        alt
                      />
                    </a>
                  </div>
                  <p>
                    Replacing a maintains the amount of lines. When replacing a
                    selection. help agencies to define their new business
                    objectives and then create. Replacing a maintains the amount
                    of lines.
                  </p>
                  <div className="subs-feilds">
                    <div className="suscribe-input">
                      <input
                        type="email"
                        className="email form-control width-80"
                        id="sus_email"
                        placeholder="Type Email"
                      />
                      <button type="submit" id="sus_submit" className="add-btn">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End column*/}
            {/* Start column*/}
            <div className="col-md-2 col-sm-3 col-xs-12">
              <div className="footer-content">
                <div className="footer-head">
                  <h4>Products</h4>
                  <ul className="footer-list">
                    <li>
                      <a href="#">Bank Card</a>
                    </li>
                    <li>
                      <a href="#">Deposit Skim</a>
                    </li>
                    <li>
                      <a href="#">Affiliate</a>
                    </li>
                    <li>
                      <a href="#">Software</a>
                    </li>
                    <li>
                      <a href="#">Branding </a>
                    </li>
                    <li>
                      <a href="#">Promotion </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* End column*/}
            {/* Start column*/}
            <div className="col-md-2 col-sm-3 col-xs-12">
              <div className="footer-content">
                <div className="footer-head">
                  <h4>Payments</h4>
                  <ul className="footer-list">
                    <li>
                      <a href="#">Send Mony</a>
                    </li>
                    <li>
                      <a href="#">Receive Money </a>
                    </li>
                    <li>
                      <a href="#">Shopping</a>
                    </li>
                    <li>
                      <a href="#">Online payment</a>
                    </li>
                    <li>
                      <a href="#">pay a Friend </a>
                    </li>
                    <li>
                      <a href="#">pay a bill </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* End column*/}
            {/* Start column*/}
            <div className="col-md-2 hidden-sm col-xs-12">
              <div className="footer-content">
                <div className="footer-head">
                  <h4>Company</h4>
                  <ul className="footer-list">
                    <li>
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <a href="#">Services </a>
                    </li>
                    <li>
                      <a href="#">Events</a>
                    </li>
                    <li>
                      <a href="#">Promotion</a>
                    </li>
                    <li>
                      <a href="#">Transition</a>
                    </li>
                    <li>
                      <a href="#">Social Media</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* End column*/}
            {/* Start column*/}
            <div className="col-md-2 hidden-sm col-xs-12">
              <div className="footer-content last-content">
                <div className="footer-head">
                  <h4>Support</h4>
                  <ul className="footer-list">
                    <li>
                      <a href="#">Customer Care</a>
                    </li>
                    <li>
                      <a href="#">Live chat</a>
                    </li>
                    <li>
                      <a href="#">Notification</a>
                    </li>
                    <li>
                      <a href="#">Privacy</a>
                    </li>
                    <li>
                      <a href="#">Terms &amp; Condition</a>
                    </li>
                    <li>
                      <a href="#">Contact us </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* End column*/}
          </div>
        </div>
      </div>
      {/* Start footer bottom area */}
      <div className="footer-area-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="copyright">
                <p>
                  Copyright © 2020
                  <a href="#">Bultifore</a> All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End footer bottom area */}
    </footer>
  );
};

export default Footer;
