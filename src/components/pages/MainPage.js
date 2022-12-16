import { Outlet } from "react-router";
import AppHeader from "../app-header/app-header";
import AppFooter from "../app-footer/app-footer";

const MainPage = () => {
    return (
        <div className="wrapper">
            <AppHeader />
                <div className="content">
                    <Outlet/>
                </div>
            <AppFooter />
        </div>
    )
}

export default MainPage