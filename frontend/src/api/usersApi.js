import axiosClient from "./axiosClient";

const usersApi = {
  //post user:object gồm taiKhoan, matKhau, email,...
  register: (user) => {
    const path = "/auth/register";
    return axiosClient.post(path, user);
  },

  //post user:object taiKhoan, matKhau => nhận về data có accessToken
  login: (user) => {
    const path = "/auth/login";
    return axiosClient.post(path, user);
  },

  getInfor: (id) => {
    const path = `/user/show-individual?id=${id}`;
    return axiosClient.get(path);
  },

  getUserByCard: (credit) => {
    const path = `/user/show-credit?credit=${credit}`;
    return axiosClient.get(path);
  },

  uploadAvt: (data) => {
    const path = "/user/upload-img";

    return axiosClient.post(path, data);
  },

  deleteUser: (taiKhoan) => {
    const path = `/QuanLyNguoiDung/XoaNguoiDung/${taiKhoan}`;

    return axiosClient.delete(path);
  },

  updateUser: (user) => {
    const path = `/user/update`;
    return axiosClient.post(path, user);
  },
  recieveSaving: (data) => {
    const path = `/saving/receive-saving`;
    return axiosClient.post(path, data);
  },

};

export default usersApi;
