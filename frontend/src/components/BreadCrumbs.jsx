import React from "react";

const BreadCrumbs = ({title = "Trang chủ"}) => {
  return (
    <div className="page-area">
      <div className="breadcumb-overlay" />
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="breadcrumb text-center">
              <div className="section-headline white-headline text-center">
                <h3>{title}</h3>
              </div>
              <ul>
                <li className="home-bread">Trang chủ</li>
                <li>{title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbs;
