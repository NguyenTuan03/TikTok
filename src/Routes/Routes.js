
import Following from "../Pages/Following/Following"
import Home from "../Pages/Home/Home"
import Profile from "../Pages/Profile/Profile"
import Search from "../Pages/Search/Search"
import Upload from "../Pages/Upload/Upload"
import RoutesConfig from "../config/Routes"
import HeaderOnly from "../layout/headerOnly/HeaderOnly"
//Public
const publicRoutes = [
    {
        path:RoutesConfig.home,
        component: Home
    },
    {
        path:RoutesConfig.following,
        component: Following
    },
    {
        path:RoutesConfig.nickname,
        component: Profile
    },
    {
        path:RoutesConfig.search,
        component: Search,
    },
    {
        path:RoutesConfig.upload,
        component: Upload,
        layout: HeaderOnly
    }
]

const privateRoutes = [

]


export {publicRoutes,privateRoutes}