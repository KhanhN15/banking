import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <div className="about-area bg-color2 area-padding">
        <div className="container">
          <div className="row">
            {/* Start column*/}
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="about-image">
                <img
                  src="http://rockstheme.com/rocks/bultifore-preview/img/about/vd.jpg"
                  alt
                  className="ab-first-img"
                />
                <img
                  src="http://rockstheme.com/rocks/bultifore-preview/img/about/vd1.jpg"
                  alt
                  className="ab-second-img"
                />
              </div>
            </div>
            {/* End column*/}
            {/* Start column*/}
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="about-content">
                <h3>
                  Tại sao chọn dịch vụ thanh toán trực tuyến nhanh thế giới của
                  chúng tôi
                </h3>
                <p className="hidden-sm">
                  {" "}
                  Minim liber accusata pro ne, mea id quot apeirian lisque. No
                  melius nusquam sentias eam, usu ex prima iriure. Cum velit
                  dolorum scaevola ea, ex eos debitis omittantur
                </p>
                <div className="about-details">
                  <div className="single-about">
                    <a href="#">
                      <i className="flaticon-079-graphic" />
                    </a>
                    <div className="icon-text">
                      <h5>Miễn phí giao dịch</h5>
                      <p>
                        The phrasal sequence of the Lorem Ipsum text is now so
                        widespread that many the starting sequence
                      </p>
                    </div>
                  </div>
                  <div className="single-about">
                    <a href="#">
                      <i className="flaticon-007-document-2" />
                    </a>
                    <div className="icon-text">
                      <h5>An toàn &amp; Bảo mật</h5>
                      <p>
                        The phrasal sequence of the Lorem Ipsum text is now so
                        widespread that many the starting sequence
                      </p>
                    </div>
                  </div>
                  <div className="single-about">
                    <a href="#">
                      <i className="flaticon-107-speech-bubbles" />
                    </a>
                    <div className="icon-text">
                      <h5>Hỗ trợ trực tuyến</h5>
                      <p>
                        The phrasal sequence of the Lorem Ipsum text is now so
                        widespread that many the starting sequence
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End column*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
