import React from 'react'
import BreadCrumbs from '../../components/BreadCrumbs';
import DashBoard from '../../components/DashBoard';

const ShowDetail = () => {
  return (
    <>
        <BreadCrumbs title='Sổ tiết kiệm' />
        <DashBoard type='S4'/>
    </>
  )
}

export default ShowDetail