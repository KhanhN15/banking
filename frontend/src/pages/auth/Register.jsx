import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch,useSelector } from "react-redux";
import { register } from "../../store/action/user";
import {Link} from 'react-router-dom';


const Register = () => {
  const initialState = {
    fullName: "",
    cccd: "",
    birthday: "",
    address: "",
    email: "",
    phone: "",
    sex: "",
    passWord: "",
    numberCard: "",
  };
  const [user, setUser] = useState(initialState);
  const [userProvince, setUserProvince] = useState("");
  const [userDistrict, setUserDistrict] = useState("");
  const [userWard, setUserWard] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectProvince, setSelectProvince] = useState(undefined);
  const [selectDistrict, setSelectDistrict] = useState(undefined);
  const [selectWard, setSelectWard] = useState(undefined);
  const dispatch = useDispatch()

  const {pending,error,success} = useSelector(state=>state.user)
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setUser({
      ...user,
      address: `${userWard} - ${userDistrict} - ${userProvince}`,
    });
  }, [userWard]);
  useEffect(() => {
    if(success){
      toast.success('Đăng ký thành công');
    }else if(error){
      toast.error('Có lỗi xảy ra');
    }
  }, [success,error])
  
  const validateInput = () => {
    let {
      fullName,
      address,
      birthday,
      cccd,
      email,
      numberCard,
      passWord,
      phone,
      sex,
    } = user;
    if (
      !fullName ||
      !address ||
      !birthday ||
      !cccd ||
      !email ||
      !numberCard ||
      !passWord ||
      !phone ||
      !sex 
    ) {
      toast.error('Vui lòng điền đầy đủ thông tin!')
      return false;
    }
    if(cccd.length !== 12 ){
      toast.error('Căn cước công dân bắt buộc chứa 12 số')
      return false;
    }
    if(numberCard.length !== 12){
      toast.error('Mã thẻ bắt buộc chứa 12 số')
      return false;
    }
    return true;
  };
  const fetchData = async () => {
    try {
      const res = await axios.get("https://provinces.open-api.vn/api/?depth=3");
      let pro = res.data.map((value) => ({
        name: value.name,
        code: value.code,
      }));
      let dis = res.data.map((value) => {
        return value.districts.map((district) => ({
          name: district.name,
          code: district.code,
        }));
      });
      let war = res.data.map((value) => {
        return value.districts.map((district) => {
          return district.wards.map((ward) => ({
            name: ward.name,
            code: ward.code,
          }));
        });
      });
      setProvinces(pro);
      setDistricts(dis);
      setWards(war);
    } catch (e) {
      console.log(e);
    }
  };
  const renderProvinces = () => {
    return (
      <div className="col-md-4 mb-3">
        <label htmlFor="country">Tỉnh / thành</label>
        <select
          className="custom-select d-block w-100"
          id="country"
          required=""
          value={selectProvince}
          onChange={(e) => {
            setSelectProvince(e.target.value);
            setUserProvince(provinces[e.target.value].name);
          }}
        >
          <option value="">Choose...</option>
          {provinces.map((province, index) => (
            <option key={province.code} value={index}>
              {province.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderDistricts = () => {
    return (
      <div className="col-md-4 mb-3">
        <label htmlFor="state">Quận / huyện</label>
        <select
          className="custom-select d-block w-100"
          id="state"
          required=""
          value={selectDistrict}
          onChange={(e) => {
            const indexOfWard = e.target.value;
            setUserDistrict(districts[selectProvince][indexOfWard].name);
            setSelectDistrict(e.target.value);
          }}
        >
          <option value="">Choose...</option>
          {districts[selectProvince]?.map((district, index) => (
            <option key={index} value={index}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderWards = () => {
    return (
      <div className="col-md-4 mb-3">
        <label htmlFor="state">Xã / phường</label>
        <select
          className="custom-select d-block w-100"
          id="state"
          required=""
          value={selectWard}
          onChange={(e) => {
            const indexOfWard = e.target.value;
            setUserWard(
              wards[selectProvince][selectDistrict][indexOfWard].name
            );
            setSelectWard(indexOfWard);
          }}
        >
          <option value="">Choose...</option>
          {selectProvince &&
            selectDistrict &&
            wards[selectProvince][selectDistrict]?.map((ward, index) => (
              <option key={index} value={index}>
                {ward.name}
              </option>
            ))}{" "}
        </select>
      </div>
    );
  };

  const handleChangeUser = (e) => {
    let { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleRegister = (e) => {
    e.preventDefault()
    const isValid = validateInput()
    if(isValid){
      dispatch(register(user))
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
      <div className="dashboard-content login-area area-padding fix">
        <div className="login-overlay" />
        <div className="table">
          <div className="table-cell">
            <div className="container">
              <div className="row">
                <div className="col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8 col-xs-12">
                  <div className="login-form signup-form">
                    <h4 className="login-title text-center">Đăng ký</h4>
                    <div className="row">
                      <form
                        onSubmit={handleRegister}
                        id="contactForm"
                        className="log-form"
                      >
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Số điện thoại"
                            value={user.phone}
                            name="phone"
                            onChange={handleChangeUser}
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="password"
                            id="msg_subject"
                            className="form-control"
                            placeholder="Mật khẩu"
                            value={user.passWord}
                            name="passWord"
                            onChange={handleChangeUser}
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="text"
                            id="email"
                            className="form-control"
                            placeholder="Tên đầy đủ"
                            value={user.fullName}
                            name="fullName"
                            onChange={handleChangeUser}
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="text"
                            id="email"
                            className="form-control"
                            placeholder="Số thẻ"
                            value={user.numberCard}
                            name="numberCard"
                            onChange={handleChangeUser}
                            maxLength={12}
                            
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="text"
                            id="email"
                            className="form-control"
                            placeholder="CCCD/CMND"
                            value={user.cccd}
                            name="cccd"
                            onChange={handleChangeUser}
                            maxLength={12}
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="date"
                            id="cmsg_subject"
                            className="form-control"
                            placeholder="Ngày sinh"
                            value={user.birthday}
                            name="birthday"
                            onChange={handleChangeUser}
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="email"
                            id="cmsg_subject"
                            className="form-control"
                            placeholder="Email"
                            value={user.email}
                            name="email"
                            onChange={handleChangeUser}
                          />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 radio-form">
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="customRadioInline1"
                              className="custom-control-input"
                              value="nam"
                              name="sex"
                              onChange={handleChangeUser}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadioInline1"
                            >
                              Nam
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="customRadioInline2"
                              value="nu"
                              name="sex"
                              onChange={handleChangeUser}
                              className="custom-control-input"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadioInline2"
                            >
                              Nữ
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              type="radio"
                              id="customRadioInline2"
                              className="custom-control-input"
                              value="khac"
                              name="sex"
                              onChange={handleChangeUser}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadioInline2"
                            >
                              Khác
                            </label>
                          </div>
                        </div>

                        {/* Render Provinces */}
                        {renderProvinces()}
                        {/* Render Districts */}
                        {renderDistricts()}
                        {/* Render Wards */}
                        {renderWards()}

                        <div className="col-md-12 col-sm-12 col-xs-12 text-center mt">
                          <button
                            type="submit"
                            id="submit"
                            className="slide-btn login-btn"
                            disabled={pending}
                          >
                            Đăng ký
                          </button>
                          <div
                            id="msgSubmit"
                            className="h3 text-center hidden"
                          />
                          <div className="clearfix" />
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                          <div className="clear" />
                          <div className="separetor text-center">
                            <span>Hoặc </span>
                          </div>
                          <div className="sign-icon">
                            <div className="acc-not">
                              đã có tài khoản <Link to="/login">Dăng nhập</Link>
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

export default Register;
