import React from 'react'
import classNames from 'classnames/bind'
import styles from './SideBar.module.scss'
import Menu from './menu/Menu'
import MenuItem from './menu/MenuItem'
import routes from '../../../config/Routes'
import { FollowingIcon, HomeIcon, LiveIcon } from '../../../Components/icons/Icon'
import { Image } from '../../../Components/image/Image'
const cx = classNames.bind(styles)
export default function SideBar() {
  return (
    <aside className={cx('wrapper')}>
        <Menu>
            <MenuItem title='For You' to={routes.home} icon={<HomeIcon/>}/>
            <MenuItem title='Following' to={routes.following} icon={<FollowingIcon/>}/>
            <MenuItem title='Explore' to={routes.live} icon={<LiveIcon/>}/>
            <MenuItem title='Profile' to={routes.profile} icon={<Image
              className={cx('profile')} 
              src='https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/5df85a846efbc97e38030a793178f94e~c5_720x720.jpeg?lk3s=a5d48078&x-expires=1703858400&x-signature=CwcO0gfSHoID7ZTCeLoyoqmKhak%3D'
              alt='Nguyen Anh Tuan' 
            />}/>
        </Menu>        
    </aside>
  )
}
