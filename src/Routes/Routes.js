import HeaderOnly from "../Components/Layout/HeaderOnly/HeaderOnly"
import Following from "../Pages/Following/Following"
import Home from "../Pages/Home/Home"
import Profile from "../Pages/Profile/Profile"
import Search from "../Pages/Search/Search"
import Upload from "../Pages/Upload/Upload"

//Public
const publicRoutes = [
    {
        path:'/',
        component: Home
    },
    {
        path:'/following',
        component: Following
    },
    {
        path:'/profile',
        component: Profile
    },
    {
        path:'/search',
        component: Search,
    },
    {
        path:'/upload',
        component: Upload,
        layout: HeaderOnly
    }
]

const privateRoutes = [

]


export {publicRoutes,privateRoutes}