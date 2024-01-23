import React from 'react'
import "./productUI.css";


function ProductUISkeleton() {
  return (
    <>
<div  id="productUI" className='productUISkeleton' >

      <div
      style={{
      padding:'10px 10px 0px 10px'}}
        id="productimg"

        
      >
      <div className='imgBg' ></div>
       </div>

      <div style={{backgroundColor:'transparent'}} id="product-details">
        <div  className='fieldsBg' style={{borderRadius:'10px',width:'100%',height:'22%',backgroundColor:'#efe9e9'}}></div>
        <div  className='fieldsBg' style={{borderRadius:'10px',width:'100%',height:'22%',backgroundColor:'#efe9e9'}}></div>
        <div style={{display:'flex',width:'100%',height:'22%',justifyContent:'space-between'}}>
        <div  className='fieldsBg' style={{borderRadius:'10px',width:'80%',height:'100%',backgroundColor:'#efe9e9'}}></div>
        <div  className='fieldsBg' style={{borderRadius:'50px',aspectRatio:'1/1',height:'100%',backgroundColor:'#efe9e9'}}></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductUISkeleton