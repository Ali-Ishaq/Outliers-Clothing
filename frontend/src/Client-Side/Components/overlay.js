import React, { useContext } from 'react'
import { hooksContext } from '../Contexts/hooksContext'

function OverlayComp() {
    const{Overlay}=useContext(hooksContext)
  return (
    <div id='drawer-overlay' ref={Overlay} style={{position:'fixed',top:'0px',height:'100vh',width:'100vw',backgroundColor:'#0000008f', display:'none' ,zIndex:'4'}}></div>
  )
}

export default OverlayComp;