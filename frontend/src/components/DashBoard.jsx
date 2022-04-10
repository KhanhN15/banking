import React, { useState } from "react";
import SendMoney from "./SendMoney";
import { useDispatch, useSelector } from "react-redux";
import { fCurrency } from "../utilities/formatCost";
import { Link } from "react-router-dom";
import Log from "./TransectionsLog";
import PassBook from "./PassBook";
import ShowDetail from "./PassBook/ShowDetail";
import ManageAccount from "../components/ManageAccount";
import usersApi from "../api/usersApi";
import { getInfor } from "../store/action/user";

const DashBoard = ({ type = "S1" }) => {
  const dispatch = useDispatch();
  const { userInfor } = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("user"));
  const [image, setImage] = useState(null);
  const handleUploadAvt = async (e) => {
    const image = e.target.files[0];

    if (image) {
      let formData = new FormData();
      formData.append("image", image);
      formData.append("id", userInfor.id);
      await usersApi
        .uploadAvt(formData)
        .then((res) => {
          dispatch(getInfor(userInfor.id));
          alert(res.data.message);
        })
        .catch((err) => {
          alert("Có lỗi xảy ra");
        });
    }
  };
  return (
    <>
      <div className="dsahboard-area bg-color area-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="dashboard-head">
                <div className="row">
                  <div className="col-md-3 col-sm-3 col-xs-12">
                    <div className="single-dash-head">
                      <div className="dashboard-profile">
                        <div className="profile-content">
                          <img
                            src={
                              userInfor && userInfor.image
                                ? `http://localhost:8081/images/${userInfor.image}`
                                : "http://rockstheme.com/rocks/bultifore-preview/img/about/profile.png"
                            }
                            alt
                          />
                          <input type="file" onChange={handleUploadAvt}></input>
                          <span className="pro-name">
                            {userInfor && userInfor.fullName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-12">
                    <div className="single-dash-head">
                      <div className="dashboard-amount">
                        <div className="amount-content">
                          <i className="flaticon-028-money" />
                          <span className="pro-name">
                            Số dư:{" "}
                            {userInfor &&
                              fCurrency(Number(userInfor.CreditCard.money))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-12">
                    <div className="single-dash-head">
                      <div className="dashboard-amount">
                        <div className="amount-content">
                          <i className="flaticon-043-bank-2" />
                          <span className="pro-name">Agribank</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-xs-12">
                    <div className="single-dash-head">
                      <div className="dashboard-amount">
                        <div className="amount-content">
                          <i className="flaticon-050-credit-card-2" />
                          <span className="pro-name">
                            Số thẻ:{" "}
                            {userInfor && userInfor.CreditCard.numberCard}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-sm-3 col-xs-12">
              <aside className="sidebar">
                <div className="dashboard-side">
                  <ul>
                    <li className={type == "S1" ? "active" : ""}>
                      <Link to="/chuyen-tien">
                        <i className="ti-new-window" />
                        Chuyển tiền
                      </Link>
                    </li>
                    <li className={type == "S3" ? "active" : ""}>
                      <Link to="/gui-so-tiet-kiem">
                        <i class="ti-wallet"></i>
                        Gửi sổ tiết kiệm
                      </Link>
                    </li>
                    <li className={type == "S4" ? "active" : ""}>
                      <Link to="/so-tiet-kiem">
                        <i class="ti-wallet"></i>
                        Thông tin sổ tiết kiệm
                      </Link>
                    </li>
                    <li className={type == "S2" ? "active" : ""}>
                      <Link to="/lich-su-giao-dich">
                        <i class="ti-layout-list-thumb"></i>
                        Lịch sử giao dịch
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="dashboard-support">
                  <div className="support-inner">
                    <div className="help-support">
                      <i className="flaticon-107-speech-bubbles" />
                      <a href="contact.html">
                        <span className="help-text">Bạn cần hỗ trợ ?</span>
                      </a>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
            {type == "S1" && <SendMoney />}
            {type == "S2" && (
              <Log
                card={user && user.CreditCard && user.CreditCard.numberCard}
              />
            )}
            {type == "S3" && <PassBook />}
            {type == "S4" && <ShowDetail />}
            {type == "S5" && <ManageAccount />}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
