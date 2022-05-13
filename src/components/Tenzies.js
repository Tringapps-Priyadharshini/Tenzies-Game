//npm i react-canvas-confetti
import "../assets/Tenzies.css";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import { useEffect, useState } from 'react'
// import ReactCanvasConfetti from "react-canvas-confetti";
export default function Tenzies() {
    const [dice, setDice] = useState(allNewDice())
    const [finishGame,setfinishGame] = useState(false)

    useEffect(()=>{
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die=>die.value === firstValue)
        if(allHeld && allSameValue){
            setfinishGame(true)
            console.log('won')
        }
    },[dice])

    function generateDie(){
        return{
            value:Math.ceil(Math.random() * 6),
                isHeld:false,
                id:nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateDie())
        }
        return newDice;
    }
    function rollDice(){
        if(!finishGame){
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateDie()
            }))
        }
        else{
            setfinishGame(false)
            setDice(allNewDice())
        }
        
    }

    function holdDice(id){
        setDice(oldDice => oldDice.map(diceValue =>{
            return diceValue.id === id ?
                {...diceValue,isHeld:!diceValue.isHeld} : diceValue
        }))
    }

    return (

        <div className="App">
            
            <div className="outline">
                {/* {finishGame && <ReactCanvasConfetti />} */}
            <h1 className="heading">Tenzies</h1>
            <p className="gameInstructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="diceContainer">
                    {
                        dice.map(diceValue => <Dice key ={diceValue.id} value={diceValue.value} isHeld = {diceValue.isHeld} holdDice = {()=>holdDice(diceValue.id)}/>)
                     }
                </div>
                <button onClick = {rollDice} className="rollButton">
                {finishGame ? "New Game":"Roll"}</button>
                {finishGame && <h1 className="won">You won</h1>}
            </div>
        </div>
    );
}

