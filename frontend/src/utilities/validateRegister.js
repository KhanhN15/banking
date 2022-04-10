export default validateInput = () => {
    let {
      fullName,
      address,
      birthday,
      cccd,
      email,
      numberCard,
      passWord,
      phone,
      sex,
    } = user;
    if (
      !fullName ||
      !address ||
      !birthday ||
      !cccd ||
      !email ||
      !numberCard ||
      !passWord ||
      !phone ||
      !sex 
    ) {
      toast.error('Vui lòng điền đầy đủ thông tin!')
      return false;
    }
    if(cccd.length !== 12 ){
      toast.error('Căn cước công dân bắt buộc chứa 12 số')
      return false;
    }
    if(numberCard.length !== 12){
      toast.error('Mã thẻ bắt buộc chứa 11 số')
      return false;
    }
    return true;
  };