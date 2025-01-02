import { useState } from "react";
import ListVideos from "../../component/listVideos/ListVideos";
import LogIn from "../logIn/LogIn";

export default function Following() {
  const [open, setOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const handleClose = () => setOpen(false);
  return (
    <> 
    {
      user ?
      <ListVideos type={"following"}/> :
      <LogIn isOpen={open} handleClose={handleClose} />
    }       
    </>
  )
}
