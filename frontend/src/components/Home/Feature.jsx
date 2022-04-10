import React from "react";

const Feature = () => {
  return (
    <>
      <div className="feature-area fix area-padding-2">
        <div className="container">
          <div className="row">
            {/* Start single column*/}
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="feature-image">
                <div className="rotmate-image rotateme">
                  <img
                    src="http://rockstheme.com/rocks/bultifore-preview/img/about/circle.png"
                    alt
                  />
                </div>
                <div className="top-img">
                  <img
                    src="http://rockstheme.com/rocks/bultifore-preview/img/about/ab1.png"
                    alt
                  />
                </div>
              </div>
            </div>
            {/* End single column*/}
            {/* Start single column*/}
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="row">
                <div className="feature-text-all">
                  {/* Start feature column  */}
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div
                      className="feature-text wow fadeInUp"
                      data-wow-delay="0.2s"
                    >
                      <img
                        src="http://rockstheme.com/rocks/bultifore-preview/img/feature/f1.jpg"
                        alt
                        className="feature-img"
                      />
                      <div className="featture-content">
                        <h4>Freelancer</h4>
                        <p>
                          But I must explain to you how all this mistaken idea
                          of denouncing pleasure and praising pain
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End feature column  */}
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div
                      className="feature-text wow fadeInUp"
                      data-wow-delay="0.3s"
                    >
                      <img
                        src="http://rockstheme.com/rocks/bultifore-preview/img/feature/f2.jpg"
                        alt
                        className="feature-img"
                      />
                      <div className="featture-content">
                        <h4>Mua sắm trực tuyến</h4>
                        <p>
                          But I must explain to you how all this mistaken idea
                          of denouncing pleasure and praising pain
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End feature column  */}
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div
                      className="feature-text wow fadeInUp"
                      data-wow-delay="0.4s"
                    >
                      <img
                        src="http://rockstheme.com/rocks/bultifore-preview/img/feature/f3.jpg"
                        alt
                        className="feature-img"
                      />
                      <div className="featture-content">
                        <h4>Thanh toán bạn bè</h4>
                        <p>
                          But I must explain to you how all this mistaken idea
                          of denouncing pleasure and praising pain
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End feature column  */}
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div
                      className="feature-text wow fadeInUp"
                      data-wow-delay="0.5s"
                    >
                      <img
                        src="http://rockstheme.com/rocks/bultifore-preview/img/feature/f4.jpg"
                        alt
                        className="feature-img"
                      />
                      <div className="featture-content">
                        <h4>Social marketing</h4>
                        <p>
                          But I must explain to you how all this mistaken idea
                          of denouncing pleasure and praising pain
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End feature column  */}
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

export default Feature;
