import { useContext, useState } from "react";
import "./cartUI.css";
import { GoTrash } from "react-icons/go";
import Cartdata from "../Datafiles/cartdata";
import { dispatchContext } from "../Contexts/dispatchContext";

import { motion } from 'framer-motion'
function CartUI({ UniqueId, CartImg, CartName, CartPrice, quantity,size }) {

  const [subtotal, setSubtotal] = useState(CartPrice);

  const { cartDispatch } = useContext(dispatchContext);

  const [animate,setAnimate]=useState({})

  // setSubtotal()
  function changeHandle(e) {
    console.log(e.target.value);

    setSubtotal(e.target.value * CartPrice);
  }

  function removeitem() {
    cartDispatch({ type: "removeCartItem", payload: {UniqueId:UniqueId,size:size} });
  }

  function increaseQuantity() {
    cartDispatch({ type: "increaseCartQuantity", payload: {UniqueId:UniqueId,size:size} });
  }

  function decreaseQuantity() {
    cartDispatch({ type: "decreaseCartQuantity", payload: {UniqueId:UniqueId,size:size} });
    // setCartdata(
    //     cartdata.map((obj, index) =>
    //       index === currentArray ? { ...obj, quantity: obj.quantity!==1? obj.quantity- 1 :obj.quantity } : obj

    //       )
    //   );
  }

  return (
    <motion.div
     
      id="cartUI"
    >
    
     <motion.div style={{display:'none'}} id="back-layer" animate={animate}>
     <GoTrash size={'25px'}/>
     </motion.div>

    <motion.div
    animate={animate}
    
     drag="x"
      dragConstraints={{ left:0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.5}
      unique-id={UniqueId}
      style={{ y: 0}}

     
      onDragEnd={(event, info) => {
        if (info.offset.x < -150) {
          setAnimate({x:500,transition:{duration:'0.3'}})
          setTimeout(()=>{removeitem();setAnimate({x:0,transition:{duration:'0'}})},300)
          // removeitem()
          
        }
      }}
      id="front-layer"
      
    >
      <div id="cartimg">
        <img src={CartImg} alt="" />
      </div>
      <div id="cartdetails">
        <h1 id="cartname">{CartName}</h1>
        <h1 id="cartproductsize">size: {size}</h1>
        <h1 id="cartprice">${CartPrice}</h1>
      </div>
      <div id="cartquantity">
        {/* <input  value={quantity} onChange={changeHandle} type="number" name="" id="cartquantity" min={'1'}  max={'10'}/> */}
        <button className="quantity-btn" onClick={increaseQuantity}>
          +
        </button>
        {quantity}
        <button className="quantity-btn" onClick={decreaseQuantity}>
          -
        </button>
      </div>
      <h1 id="subtotal">${quantity * CartPrice}</h1>
      <div onClick={removeitem} id="removeitem">
        <GoTrash style={{ pointerEvents: "none" }} size={"25px"} />
      </div>
      </motion.div>
    </motion.div>
  );
}
export default CartUI;
