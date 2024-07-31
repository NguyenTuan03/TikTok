import routesConfig from "../config/Routes";
import Home from './../pages/home/Home';
import Profile from './../pages/profile/Profile';
import Following from './../pages/following/Following';

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
    {
        path: routesConfig.following,
        component: Following,
        layout: null
    },
]
export default publicRoutes;