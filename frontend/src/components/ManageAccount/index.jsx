import React,{useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { getInfor } from "../../store/action/user";
import EditForm from "./EditForm";

const index = () => {
    const user = useSelector(state => state.user.userInfor)
    const dispatch = useDispatch()
    useEffect(() => {
      if(user && user.id ){
          dispatch(getInfor(user.id));
      }
    }, [dispatch])
    const [isOpen, setIsOpen] = useState(false)
    const handleOpenForm = ()=>{
        setIsOpen(true)
    }
    const handleCloseForm = ()=>{
        setIsOpen(false)
    }
  return (
    <>
      <div className="col-md-9 col-sm-9 col-xs-12">
        <div className="dashboard-content">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="send-money-form add-bank-form">
                <div className="form-text">
                  <h4 className="form-top">Quản lý tài khoản</h4>
                  <div className="form-inner">
                    {isOpen ? (
                      <EditForm handleCloseForm={handleCloseForm} data={user} />
                    ) : (
                      <>
                        <form action="#">
                          <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                              <input
                                type="text"
                                disabled
                                value={user && user.fullName}
                                placeholder="Tên đầy đủ"
                              />
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                              <input
                                type="text"
                                disabled
                                value={user && user.cccd}
                                placeholder="Căn cước công dân"
                              />
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                              <input
                                type="text"
                                disabled
                                value={user && user.birthday}
                                placeholder="Ngày sinh"
                              />
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                              <input
                                type="email"
                                disabled
                                value={user && user.email}
                                placeholder="Email"
                              />
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <input
                                type="text"
                                disabled
                                value={user && user.address}
                                placeholder="Địa chỉ"
                              />
                            </div>

                            <div className="col-md-6 col-sm-6 col-xs-12">
                              <input
                                type="number"
                                disabled
                                value={user && user.phone}
                                placeholder="Số diện thoại"
                              />
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                              <input
                                type="text"
                                disabled
                                value={
                                  user && user.sex == "nu"
                                    ? "Nữ"
                                    : user && user.sex == "nam"
                                    ? "Nam"
                                    : "Khác"
                                }
                                placeholder="Giới tính"
                              />
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12"></div>
                            <div className="col-md-4 col-sm-4 col-xs-12">
                              <button onClick={handleOpenForm} type="submit">
                                Sửa tài khoản
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    )}
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

export default index;
