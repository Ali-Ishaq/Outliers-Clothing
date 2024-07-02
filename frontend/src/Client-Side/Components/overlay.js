import React, { useContext, useEffect, useState } from 'react'
import { hooksContext } from '../Contexts/hooksContext'

function OverlayComp() {

    const[overlayStyle,setOverlayStyle]=useState(
      {
        position:'fixed',
        top:'0px',
        height:'100vh',
        width:'100vw',
        backgroundColor:'#0000008f',
        display:'none',
        zIndex:'4'
      }
    )
    const{overlayVisibility,setOverlayVisibility}=useContext(hooksContext)

    

  useEffect(()=>{
    if(overlayVisibility){
      setOverlayStyle((prevStyle)=>{
        return {...prevStyle,display:'flex'}
      })

      
      document.body.style.overflow = "hidden";

      if(window.visualViewport.width>600){
        document.body.style.marginRight = "17px";
      }

      }else{
        setOverlayStyle((prevStyle)=>{
          return {...prevStyle,display:'none'}
          })
        document.body.style.marginRight = "";
        document.body.style.overflow = "unset";

        if(window.visualViewport.width>600){
          document.body.style.marginRight = "";
        }

      
    }
    console.log('kdkd')
  },[overlayVisibility])

  return (
    <div id='drawer-overlay'  style={overlayStyle}></div>
  )
}

export default OverlayComp;