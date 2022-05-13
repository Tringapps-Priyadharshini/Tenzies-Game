import React from "react";
import '../assets/Dice.css'
export default function Dice(props) {
    const toggleDice = {
        backgroundColor:props.isHeld ? '#59E391':'white'
    }
  return (
    <div>
      <div className="dieContent" style = {toggleDice} onClick={props.holdDice}>
        <h3 className="value">{props.value}</h3>
      </div>
    </div>
  );
}
