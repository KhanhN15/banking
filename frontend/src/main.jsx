import React from 'react'
import ReactDOM from 'react-dom'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from './layout/Layout'
import './sass/index.scss'
import { Provider} from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
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
      <Layout />
    </Provider>,
  document.getElementById('root')
)
