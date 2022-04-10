import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import adminApi from "../../api/adminApi";
import { role } from "../../utilities/common";
import { toast } from "react-toastify";

const ManageUser = () => {
    const [listUser, setListUser] = useState([]);
    let history = useHistory();
  const showUser = async () => {
    try {
      let res = await adminApi.getAllUser();
      if (res.data.status === 1) {
        setListUser(res.data.message.data);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
    };
    
    const handleRemoveUser = async(id ,name)=>{
      try {
        let res = await adminApi.activeUser(id,0);
      if (res.data.status === 1) {
        toast.warning(`Tài Khoản ${name} đã bị khóa`);
        history.push(`/admin/dashboard`)
      }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }

const handleShowUser = (id)=>{  
    return history.push(`/admin/show-user/${id}`);
}

  useEffect(() => {
    showUser();
  }, []);

  return (
    <div class="form-inner table-inner">
      <table>
        <tr>
          <th>Tên Tài Khoản</th>
          <th>Ảnh</th>
          <th>Kích Hoạt</th>
          <th>Quyền</th>
          <th>Hành Động</th>
        </tr>
        {listUser.map((e) => (
          <tr>
            <td>{e.fullName}</td>
            <td>
              <img
                style={{
                  height: "50px",
                  width: "50px",
                  objectFit: "cover",
                }}
                src={
                  'http://localhost:8081/images/'+e.image ||
                  "https://cdn5.vectorstock.com/i/1000x1000/32/09/user-sign-icon-person-symbol-human-avatar-vector-12693209.jpg"
                }
              />
            </td>
            <td>
              {e.status == 1 ? <span style={{ color:'green' }}>Đã Kích Hoạt</span> : <span style={{ color:'red' }}>Chưa Kích Hoạt</span>}
            </td>
            <td>{role(e.roleId)}</td>
            <td>
              <i class="bx bx-block" style={
                e.status === 0 ? { cursor: 'pointer', display:'none' } : { cursor: 'pointer'}
              } onClick={()=>handleRemoveUser(e.id ,e.fullName)}></i>
                    <i class='bx bx-link-external' style={{ 
                        margin: '0 40px',
                        color: 'blueviolet',
                        cursor:'pointer'
                     }}  onClick={()=>handleShowUser(e.id)}></i>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default ManageUser;
