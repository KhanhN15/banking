import axiosClient from "./axiosClient";

const transactionApi = {
  //post user:object gồm taiKhoan, matKhau, email,...
  sendMoney: (data) => {
    const path = "/transaction/send-money";
    return axiosClient.post(path, data);
  },

  //post user:object taiKhoan, matKhau => nhận về data có accessToken
  savingMoney: (data) => {
    const path = "/saving/send-saving";
    return axiosClient.post(path, data);
  },

  getTransctions: (card) => {
    const path = `/transaction/show-detail?id=${card}`;
    return axiosClient.get(path);
  },

  getSavingMoney: (id) => {
    const path = `/saving/show-saving?id=${id}`;
    return axiosClient.get(path);
  },

  postThemNguoiDung: (user) => {
    const path = "/QuanLyNguoiDung/ThemNguoiDung";

    return axiosClient.post(path, user);
  },

  deleteUser: (taiKhoan) => {
    const path = `/QuanLyNguoiDung/XoaNguoiDung/${taiKhoan}`;

    return axiosClient.delete(path);
  },

  editTaiKhoan: (user) => {
    const path = `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`;
    return axiosClient.put(path, user);
  },

  getThongTinTaiKhoan: (info) => {
    const path = `/QuanLyNguoiDung/ThongTinTaiKhoan`;
    return axiosClient.post(path, info);
  },
};

export default transactionApi;
