import React from 'react'
import Header from '../components/header/Header'


export default function HeaderOnly({children}) {
  return (
    <div>
        <Header/>
        <div className='container'>
            <div className='Content'>
                {children}
            </div>
        </div>
    </div>
  )
}
