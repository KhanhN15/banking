import React,{useEffect,useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import {getLog} from '../../store/action/transaction'
import { getInfor } from "../../store/action/user";
import transactionApi from "../../api/transactionAPI";

const index = () => {
  const dispatch = useDispatch();
  // const logs = useSelector(state => state.transaction.log)
  const [log, setLog] = useState()
  const card = useSelector(state => state.user.userInfor)
  const handleGetLog = async(card) => {
   try {
      let res = await transactionApi.getTransctions(card)
      if(res){
        setLog(res.data.message.data)
      }
   } catch (error) {
     console.log(error.response.data.message)
   }
  }
  useEffect(() => {
   if(card && card.CreditCard.numberCard){
     handleGetLog(card.CreditCard.numberCard);
   }
  }, [dispatch,card])
  
  return (
    <>
      <div className="col-md-9 col-sm-9 col-xs-12">
        <div className="dashboard-content">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="send-money-form transection-log">
                <div className="form-text">
                  <h4 className="form-top">Lịch sử giao dịch</h4>
                  <div className="form-inner table-inner">
                    <table>
                      <tbody>
                        <tr>
                          <th>Ngày</th>
                          <th>Chú thích</th>
                          <th>Trạng Thái</th>
                          <th>Số tiền</th>
                          <th>Số dư</th>
                        </tr>
                        {log && log.length > 0 && log.map((item,index)=>{
                          return (
                            <tr>
                              <td>{item.date}</td>
                              <td>{item.description}</td>
                              <td>
                                {item.type == "CK" &&
                                item.idSend == card.CreditCard.numberCard
                                  ? "Chuyển khoản"
                                  : item.type == "CK" &&
                                    item.idReceive == card.CreditCard.numberCard
                                  ? "Nhận tiền"
                                  : "Gửi sổ tiết kiệm"}
                              </td>
                              <td>
                                {item.type == "CK" &&
                                item.idSend == card.CreditCard.numberCard
                                  ? "- "
                                  : item.type == "CK" &&
                                    item.idReceive == card.CreditCard.numberCard
                                  ? "+ "
                                  : "- "}
                                {item.moneySend} VNĐ
                              </td>
                              <td>{item.moneyRest} VNĐ</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
