import BreadCrumbs from "../../components/BreadCrumbs"
import DashBoardAdmin from "../../components/DashBoardAdmin"

const ManageUser = () => {
    return (
        <>
            <BreadCrumbs title='Admin Quản Lí Sổ Tiết Kiệm' />
            <DashBoardAdmin type="SAVE_MONEY"/>
        </>
    )
}

export default ManageUser