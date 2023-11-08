import './style.css';
import Dice from './component/dice';
import { useEffect, useState } from 'react';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti';

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] =useState(false)
  const [timesOfRoll, setTimesOfRoll] = useState(0)
  const [winnerRoll, setWinnerRoll] = useState(100)

  useEffect(() => {
    const allDice = dice.every(dice => dice.isHeld)
    const firstValue = dice[0].value
    const allValue =dice.every(dice => dice.value === firstValue)
    if (allDice && allValue ){
      if (timesOfRoll <= winnerRoll ){
        setWinnerRoll(timesOfRoll)
      }
      setTenzies(true)
      
    }
  },
  [dice])

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice(){

    const newDice = []
    for (let i=0;  i<10; i++){
      newDice.push(generateNewDie())}
    
    return(newDice)
  }

  function newGame(){
    

    setTimesOfRoll(0)
    setTenzies(false)
    setDice(allNewDice())

  }
  

  function rollDice(){
    
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die :
      generateNewDie()
    }))
    setTimesOfRoll(timesOfRoll +1)
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id? 
      {...die, isHeld: !die.isHeld } :
      die

    }))
  }

 
  const diceElements = dice.map(die => <Dice key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  return (
    
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      { tenzies && (
          <p className='win-instructions'> Congratulations you won in {timesOfRoll}th roll.<br></br>
          Fastest win is in {winnerRoll} rolls.</p>
         )}  
      { !tenzies && (
           <p className="instructions">Roll until all dice are the same. <br></br>
            Click each die to freeze it at its current value between rolls.</p>

         )}
           
      <div className="dice-container">
 
        {diceElements }
        
      </div>
      <div>
      

      </div>
      
            <button className='roll-dice' onClick={tenzies ? newGame:  rollDice}> {tenzies? "Play Again" : "Roll"} </button>

    </main>
    
  );
}

export default App;
