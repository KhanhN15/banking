import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import adminApi from "../../api/adminApi";
import {  toast } from "react-toastify";

const DetailUsers = () => {
  const [user, setUser] = useState({});
  const [isCheck, setIsCheck] = useState(false);
  let { id } = useParams();
  let history = useHistory();

  useEffect(async() => {
    try {
      let res = await adminApi.getUserById(id);
      if (res.data.status === 1) {
        await setUser(res.data.message.data);  
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, [isCheck]);

  const handleActiveUser = async (e) => {
    e.preventDefault()
    try {
      let res = await adminApi.activeUser(id,1);
      if (res.data.status === 1) {
        setIsCheck(true);
        toast.success('Kích Hoạt Tài Khoản Thành Công');
        history.push(`/admin/dashboard`)
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="row">
      <div className="col-md-9 col-sm-9 col-xs-12">
        <div className="dashboard-content">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="send-money-form">
                <div className="form-text">
                  <div className="form-inner">
                    <form action="" ons>
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="textmsde">FullName</label>
                          <input disabled value={user.fullName} rows={4} />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="textmsde">CCCD</label>
                          <input disabled value={user.cccd} rows={4} />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="textmsde">Địa Chỉ</label>
                          <input disabled value={user.address} rows={4} />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="textmsde">Email</label>
                          <input disabled value={user.email} rows={4} />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="textmsde">Số Điện Thoại</label>
                          <input disabled value={user.phone} rows={4} />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="textmsde">Giới Tính</label>
                          <input
                            disabled
                            value={user.sex === "MALE" ? "Nam" : "Nữ"}
                            rows={4}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="textmsde">Số Dư </label>
                          <input
                            disabled
                            value={user.CreditCard?.money + " VND"}
                            rows={4}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="textmsde">Số Tài Khoản</label>
                          <input
                            disabled
                            value={user.CreditCard?.numberCard}
                            rows={4}
                          />
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          {user.status === 0 ? (
                            <button onClick={(e)=>handleActiveUser(e)}>Kích Hoạt Tài Khoản</button>
                          ) : (
                            ""
                          )}
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
      <div className="col-sm-2" style={{ margin: "0 auto" }}>
        <div
          style={{
            height: "100px",
            width: "100px",
            overflow: "hidden",
            borderRadius: "50% ",
          }}
        >
          <img
            src={
              user.image
                ? 'http://localhost:8081/images/'+user.image
                : "http://rockstheme.com/rocks/bultifore-preview/img/about/profile.png"
            }
            style={{
              height: "100px",
              width: "100px",
            }}
            alt=""
          />
        </div>

        <div className="name" style={{ width: "200px" ,paddingTop:'20px'}}>
          <span>{ user.fullName}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailUsers;
