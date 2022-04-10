import React, { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import { getInfor } from "../../store/action/user";
import transactionApi from "../../api/transactionApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const initialState = {
  idUser: "",
  moneySaving: "",
  typeRate: "6T",
  description: "",
  typeStatus: "GDTK",
  stkUserRecive: "",
  date: moment(new Date()).format("YYYY/MM/DD"),
};

const index = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(initialState);
  const user = useSelector((state) => state.user.userInfor);
  const {
    description,
    idUser,
    moneySaving,
    stkUserRecive,
    typeRate,
    typeStatus,
    date
  } = data;
  const validateInput = () => {
    if (
      !description ||
      !idUser ||
      !moneySaving ||
      !stkUserRecive ||
      !typeRate ||
      !typeStatus ||
      !date
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (user && data) {
      setData({
        ...data,
        idUser: user.id,
        stkUserRecive: user.CreditCard.numberCard,
      });
    }
  }, [user]);
  const handleClearInput = () => {
    setData(initialState);
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setData({ ...data, [name]: value });
  };
  const handleSendMoney = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    try {
      const res = await transactionApi.savingMoney(data);
      if (res) {
        if (res.data.status === 0) {
          toast.error("Số tiền trong tài khoản không đủ để thực hiện giao dịch")
        } else {
          toast.success("Gủi tiền thành công");
        }
      }
      dispatch(getInfor(user.id));
      handleClearInput();
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
                  <h4 className="form-top">Gửi sổ tiết kiệm</h4>
                  <div className="form-inner">
                    <form action="#">
                      <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                          <label htmlFor="m-send">Số tiền</label>
                          <CurrencyInput
                            id="input-example"
                            name="moneySaving"
                            placeholder="Please enter a number"
                            decimalsLimit={2}
                            prefix={"VND   "}
                            value={moneySaving}
                            onValueChange={(value, name) =>
                              setData({
                                ...data,
                                [name]: value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                          <label htmlFor="currencyfrr">Loại gửi</label>
                          <select
                            defaultValue={"6T"}
                            value={typeRate}
                            onChange={handleChangeInput}
                            name="typeRate"
                            id="currencyfrr"
                          >
                            <option value="6T">6 Tháng - Lãi suất: 2%</option>
                            <option value="12T">
                              12 Tháng - Lãi suất: 2,6%
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          <button onClick={handleSendMoney} type="submit">
                            Submit
                          </button>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <label htmlFor="textmsde">Chú thích</label>
                          <textarea
                            name="description"
                            rows={4}
                            value={description}
                            onChange={handleChangeInput}
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

export default index;
