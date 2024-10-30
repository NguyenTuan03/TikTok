import { createContext, useState } from 'react'
import { PropTypes } from 'prop-types';
export const Auth = createContext();
export default function AuthContext({children}) {
    const [userAuth, setUserAuth] = useState(JSON.parse(localStorage.getItem("user"))?? "");
    const [isOpenFullVideo, setIsOpenFullVideo] = useState(false);
    const [openFormLogout, setOpenFormLogout] = useState(false);
    const [openFullVideo, setOpenFullVideo] = useState(false)
    const [idVideo, setIdVideo] = useState();
    const loginUser = (user) => {
        setUserAuth(user);
        localStorage.setItem("user", JSON.stringify(user));
    }
    const logoutUser = () => {
        setUserAuth({});
        localStorage.removeItem("user");
    }
    const value = {
        userAuth,
        setUserAuth,
        loginUser,
        logoutUser,
        isOpenFullVideo,
        setIsOpenFullVideo,
        openFormLogout,
        setOpenFormLogout,
        openFullVideo,
        setOpenFullVideo,
        idVideo,
        setIdVideo
    }
  return (
    <Auth.Provider value={value}>
        {children}
    </Auth.Provider>
  )
}
AuthContext.propTypes = {
    children: PropTypes.node
}
