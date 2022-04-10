import React from 'react'
import BreadCrumbs from '../../components/BreadCrumbs'
import DashBoard from '../../components/DashBoard'

const TransectionsLog = () => {
  return (
    <>
        <BreadCrumbs title='Lịch sử giao dịch' />
        <DashBoard type={"S2"} />
    </>
  )
}

export default TransectionsLog