import BreadCrumbs from "../../components/BreadCrumbs"
import DashBoardAdmin from "../../components/DashBoardAdmin"
import ManageUser from "../../components/Admin/ManageUser"

const DashBoard = () => {
    return (
        <>
            <BreadCrumbs title='Admin Quản Lí' />
            <DashBoardAdmin type = "TS"/>
        </>
    )
}

export default DashBoard