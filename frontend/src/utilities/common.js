import { fCurrency } from "../utilities/formatCost";
import moment from "moment";

export const role = (id) => {
  switch (id) {
    case 1:
      return "Admin";
    case 0:
      return "Người dùng";
    default:
      return "Admin";
  }
};

export const checkType = (text) => {
  switch (text) {
    case "12T":
      return "12 Tháng - 2,3%";
    case "6T":
      return "6 Tháng - 2%";
    default:
      return "6 Tháng - 2%";
  }
};

export const rateSaving = (money, date, type) => {
  const ngay_hien_tai = new Date().getTime();
  const ngay_gui = new Date(date).getTime();

  let types = type === "12T" ? 0.023 : 0.02;

  const period = (ngay_hien_tai - ngay_gui) / 1000 / 2592000;
  if (period < 1) {
    return 0;
  } else {
    return fCurrency(Math.floor(period) * types * money);
  }
};

export const getDate = (date, type) => {
  const ngay_hien_tai = new Date().getTime();
  const ngay_gui = new Date(date).getTime();

  let types = type === "12T" ? 0.023 : 0.02;

  const period = (ngay_hien_tai - ngay_gui) / 1000 / 2592000;

  return Math.floor(period) + " Tháng";
};
