import React, { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import usersApi from "../../api/usersApi";
import transactionApi from "../../api/transactionApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector,useDispatch } from "react-redux";
import { getInfor } from "../../store/action/user";
import moment from 'moment';

const initialState = {
  id: "",
  idSend: "",
  idReceive: "",
  moneySend: "",
  description: "",
  date:moment(new Date()).format("YYYY/MM/DD")
};
const Content = () => {
  const [data, setData] = useState(initialState);
  const [userReceive, setUserReceive] = useState("Tên người nhận");
  const [isSearched, setIsSearched] = useState(false);
  const user = useSelector((state) => state.user.userInfor);
  useEffect(() => {
    if (user && data) {
      setData({
        ...data,
        id: user.id,
        idSend: user.CreditCard.numberCard,
      });
    }
  }, [user]);
  const handleClearInput = () =>{
    setData(initialState)
  }
const dispatch = useDispatch()
  const handleCheckName = async () => {
    try {
      const res = await usersApi.getUserByCard(idReceive);
      if (res) {
        setUserReceive(res.data.message.data.Customer);
        setIsSearched(true);
    }
    } catch (error) {
      console.log(error.response.data);
      setUserReceive({
        ...userReceive,
        fullName: "Không tìm thấy người nhận !!!",
      });
      setIsSearched(false);
    }
  };
  const { id, idSend, idReceive, moneySend, description,date } = data;
  const validateInput = () => {
    if (!description || !id || !idReceive || !idSend || !moneySend || !date) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return false;
    }
    return true;
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (name == "idReceive" && e.target.value.length > 12) {
      return;
    }
    setData({ ...data, [name]: value });
  };
  useEffect(() => {
    if (idReceive && idReceive.length == 12) {
      handleCheckName();
    }
    if (idReceive && idReceive.length < 12) {
      setUserReceive({ ...userReceive, fullName: "" });
      setIsSearched(false)
    }
    if (
      idReceive &&
      idReceive.length <= 12 &&
      userReceive === "Tên người nhận" ||
      userReceive === "Không tìm thấy người nhận !!!" ||
      userReceive === ""
    ) {
      setIsSearched(false);
    }
  }, [idReceive]);
  const handleSendMoney = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    if (!isSearched) {
      toast.error("Số tài khoản người nhận bắt buộc chứa 12 số !!!");
    }
    try {
      const res = await transactionApi.sendMoney(data);
      if (res) {
        if (res.data.status === 0) {
          toast.error("Số tiền không đủ để thực hiện giao dịch");
        } else { 

           toast.success("Chuyển tiền thành công");
        }
      }
      dispatch(getInfor(user.id))
      handleClearInput()
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
      <div className="col-md-9 col-sm-9 col-xs-12">
        <div className="dashboard-content">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="send-money-form">
                <div className="form-text">
                  <h4 className="form-top">Chuyển tiền</h4>
                  <div className="form-inner">
                    <form action="#">
                      <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                          <label htmlFor="m-send">Số tiền</label>
                          <CurrencyInput
                            id="input-example"
                            name="moneySend"
                            placeholder="Please enter a number"
                            decimalsLimit={2}
                            min="0"
                            prefix={"VND   "}
                            value={moneySend}
                            onValueChange={(value, name) =>
                              setData({
                                ...data,
                                [name]: value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                          <label htmlFor="m-send">Tên người nhận</label>
                          <input
                            type="text"
                            disabled
                            value={userReceive.fullName}
                            id="m-send"
                            onChange={handleChangeInput}
                          />
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                          <input
                            type="number"
                            placeholder="Số tài khoản người nhận"
                            value={idReceive}
                            name="idReceive"
                            onChange={handleChangeInput}
                            maxLength={12}
                          />
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          <button
                            onClick={handleSendMoney}
                            type="submit"
                          >
                            Gửi
                          </button>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <label htmlFor="textmsde">Ghi chú</label>
                          <textarea
                            name="description"
                            rows={4}
                            id="textmsde"
                            defaultValue={""}
                            onChange={handleChangeInput}
                            value={description}
                          />
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
    </>
  );
};

export default Content;
