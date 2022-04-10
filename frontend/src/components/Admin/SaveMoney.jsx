import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import adminApi from "../../api/adminApi";
import { checkType,rateSaving ,getDate} from "../../utilities/common"
import { fCurrency } from "../../utilities/formatCost";

const SaveMoney = () => {
    const [listSaving, setListSaving] = useState([]);


    useEffect(async() => {
        try {
          let res = await adminApi.showAllSaving();
          if (res.data.status === 1) {
            setListSaving(res.data.message.data);
          }
        } catch (error) {
          console.log(error.response?.data.message);
        }
      }, []);


    return (
        <div className="form-inner table-inner">
        <table>
          <tbody>
            <tr>
              <th>STK Người Gửi Tiết Kiệm</th>
              <th>Thời Hạn Gửi Tiết Kiệm</th>
              <th>Ngày Gửi</th>
              <th>Số Tiền Ban Đầu</th>
              <th>Số Tháng Đạt Được</th>
              <th>Số Tiền Lãi(Hiện Tại)</th>
            </tr>
            {listSaving.map((e) => (
              <tr>
                <td>{e.Customer.CreditCard.numberCard}</td>
                <td>{checkType(e.typeRate)}</td>
                <td>{e.date}</td>
                <td>{fCurrency(Number(e.moneySaving))}</td>
                <td>{getDate( e.date, e.typeRate)}</td>
                <td>{rateSaving(e.moneySaving, e.date , e.typeRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}

export default SaveMoney