import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import adminApi from "../../api/adminApi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống Kê Giao Dịch Tuần Qua',
      },
    },
  };
  

const Chart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets:[]
  })
  
  useEffect(async() => {
    try {
      let res = await adminApi.showChart();
      if (res.data.status === 1) {
        setData({
          labels: res.data.message.date,
          datasets : res.data.message.data
         })
       }
      
    } catch (error) {
      console.log(error.response?.data.message);
    }
  },[])
// call api


    return (
        <>
            <h4 className="form-top">Thống Kê Giao Dịch</h4>
            <Bar options={options} data={data} />    
        </>
    )
}

export default Chart