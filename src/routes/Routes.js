import routesConfig from "../config/Routes";
import Following from "../pages/Following";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

const publicRoutes = [
    {
        path: routesConfig.home,
        component: Home
    },
    {
        path: routesConfig.profile,
        component: Profile
    },
    {
        path: routesConfig.following,
        component: Following
    },
]
export default publicRoutes;