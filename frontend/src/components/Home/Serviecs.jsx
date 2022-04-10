import React from "react";

const Serviecs = () => {
  return (
    <>
      <div className="services-area bg-color area-padding-2">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="section-headline white-headline text-center">
                <h3>Dịch vụ chuyển tiền trên toàn thế giới Lưu</h3>
                <p>
                  Giúp xác định các mục tiêu kinh doanh mới của họ
                  và sau đó tạo phần mềm chuyên nghiệp.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {/* Start single column*/}
            <div className="col-md-3 col-sm-4 col-xs-12">
              <div className="single-service ">
                <div className="service-img">
                  <a className="service-icon" href="#">
                    <i className="flaticon-048-atm" />
                  </a>
                </div>
                <div className="main-service">
                  <div className="service-content">
                    <h4>Chuyển tiền</h4>
                  </div>
                </div>
              </div>
            </div>
            {/* End single column*/}
            <div className="col-md-3 col-sm-4 col-xs-12">
              <div className="single-service ">
                <div className="service-img">
                  <a className="service-icon" href="#">
                    <i className="flaticon-103-buildings" />
                  </a>
                </div>
                <div className="main-service">
                  <div className="service-content">
                    <h4>Gửi sổ tiết kiệm</h4>
                  </div>
                </div>
              </div>
            </div>
            {/* End single column*/}
            <div className="col-md-3 col-sm-4 col-xs-12">
              <div className="single-service ">
                <div className="service-img">
                  <a className="service-icon" href="#">
                    <i className="flaticon-067-shopping-cart-1" />
                  </a>
                </div>
                <div className="main-service">
                  <div className="service-content">
                    <h4>Mua sắm trực tuyến</h4>
                  </div>
                </div>
              </div>
            </div>
            {/* End single column*/}
            <div className="col-md-3 col-sm-4 col-xs-12">
              <div className="single-service ">
                <div className="service-img">
                  <a className="service-icon" href="#">
                    <i className="flaticon-040-mobile-phone-4" />
                  </a>
                </div>
                <div className="main-service">
                  <div className="service-content">
                    <h4>Thanh toán trực tuyến</h4>
                  </div>
                </div>
              </div>
            </div>
            {/* End single column*/}
            <div className="col-md-offset-3 col-md-3 col-sm-4 col-xs-12">
              <div className="single-service ">
                <div className="service-img">
                  <a className="service-icon" href="#">
                    <i className="flaticon-109-credit-card" />
                  </a>
                </div>
                <div className="main-service">
                  <div className="service-content">
                    <h4>Thẻ trả trước</h4>
                  </div>
                </div>
              </div>
            </div>
            {/* End single column*/}
            <div className="col-md-3 col-sm-4 col-xs-12">
              <div className="single-service ">
                <div className="service-img">
                  <a className="service-icon" href="#">
                    <i className="flaticon-091-mobile-phone-2" />
                  </a>
                </div>
                <div className="main-service">
                  <div className="service-content">
                    <h4>Thanh toán hóa đơn</h4>
                  </div>
                </div>
              </div>
            </div>
            {/* End single column*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default Serviecs;
