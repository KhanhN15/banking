export function fCurrency(number) {
  return number.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}
