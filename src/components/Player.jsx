import { useState } from "react"

export default function Player({initialName, symbol, isActive, onChangeName})
{
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false)

    // ImportantConcept changing the state variable by looking at the same state variable it has scheduling so use a function to execute immediately
    function handleEditClick() {
        setIsEditing((editing) => !editing);
        if(isEditing){
            onChangeName(symbol,playerName)
        }
    }

    function handleChange(e) {
        setPlayerName(e.target.value);
    }
    
    let editablePlayerName = <span className="player-name">{playerName}</span>
    
    if(isEditing) {
        editablePlayerName = <input type="text" value={playerName} required onChange={handleChange}></input>
    }
    
    return (
        <li className={isActive ? "active" : undefined}>
          <span className="player">{editablePlayerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>
      </li>
    )
}