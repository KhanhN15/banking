import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateUser,getInfor } from '../../store/action/user';



const EditForm = ({ data, handleCloseForm }) => {
  const initialState = data;
  const dispatch = useDispatch();
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
  const [isSet, setIsSet] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (isSet) {
      setUser({
        ...user,
        address: `${userWard} - ${userDistrict} - ${userProvince}`,
      });
    }
    setIsSet(true);
  }, [userWard, userProvince, userDistrict]);

  const validateInput = () => {
    let { fullName, address, birthday, email, sex, id } = user;
    if (!fullName || !address || !birthday || !email || !id || !sex) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
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
  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (validateInput()) {
      dispatch(updateUser(user));
    } else {
      alert("Đã xảy ra lỗi!!");
    }
    dispatch(getInfor(user.id));
    handleCloseForm()
  };
  return (
    <>
      <form>
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-12">
            <input
              type="text"
              value={user && user.fullName}
              placeholder="Tên đầy đủ"
              name="fullName"
              onChange={handleChangeUser}
            />
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12">
            <input
              type="date"
              value={user && user.birthday}
              placeholder="Ngày sinh"
              name="birthday"
              onChange={handleChangeUser}
            />
          </div>
          <div className="col-md-12 col-sm-12 col-xs-12">
            <input
              type="email"
              value={user && user.email}
              placeholder="Email"
              name="email"
              onChange={handleChangeUser}
            />
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12">
            {renderProvinces()}
            {/* Render Districts */}
            {renderDistricts()}
            {/* Render Wards */}
            {renderWards()}
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12">
            <input
              type="text"
              value={user && user.address}
              placeholder="Tên đầy đủ"
            />
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <label for="currencyfrr">Giới tính</label>
            <select
              name="sex"
              onChange={handleChangeUser}
              value={user && user.sex ? user.sex : "nam"}
              id="currencyfrr"
            >
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
              <option value="khac">Khác</option>
            </select>
          </div>

          <div className="col-md-4 col-sm-4 col-xs-12">
            <button onClick={handleUpdateUser} type="submit">
              Sửa
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditForm