import React, { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function privateRoute(props) {
    const nav = useNavigate();
    useLayoutEffect(() => {
        if (!localStorage.getItem('id')) {
            nav('/');
        }
    })
  return (
    <div>
        <div>
            {props.chidren}
        </div> 
    </div>
  )
}
