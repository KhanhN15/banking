import BreadCrumbs from "../../components/BreadCrumbs"
import DetailUsers from "../../components/Admin/DetailUsers"
import DashBoardAdmin from "../../components/DashBoardAdmin"

const DetailUser = () => {
    return (
        <>
            <BreadCrumbs title='Admin Chi Tiết Tài Khoản' />
            <DashBoardAdmin type="DETAIL_USER"/>
           
        </>
    )
}

export default DetailUser