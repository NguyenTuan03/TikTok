import routesConfig from "../config/Routes";
import Home from './../pages/home/Home';
import Profile from './../pages/profile/Profile';
import Following from './../pages/following/Following';
import User from './../pages/user/User';
import Video from "../pages/video/Video";

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
        path: routesConfig.nickname,
        component: User
    },
    {
        path: routesConfig.video,
        component: Video,
        layout: null
    },
    {
        path: routesConfig.following,
        component: Following,
        layout: null
    },
]
export default publicRoutes;