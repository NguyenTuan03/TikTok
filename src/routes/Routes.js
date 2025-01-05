import routesConfig from "../config/Routes";
import Home from './../pages/home/Home';
import Profile from './../pages/profile/Profile';
import Following from './../pages/following/Following';
import User from './../pages/user/User';
import FullVideo from "../pages/fullvideo/FullVideo";
import FullScreenLayout from "../layout/FullScreenLayout";
import SearchUser from "../pages/search/Search";
import Upload from "../pages/upload/Upload";
import UploadLayout from "../layout/UploadLayout";

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
        path: routesConfig.upload,
        component: Upload,
        layout: UploadLayout
    },    
    {
        path: routesConfig.user,
        component: SearchUser
    },    
    {
        path: routesConfig.following,
        component: Following,        
    },
    {
        path: routesConfig.video,
        component: FullVideo,
        layout: FullScreenLayout
    },
]
export default publicRoutes;