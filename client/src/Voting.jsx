import React, { useState } from 'react';
import SeerVote from './SeerVote.jsx';
import DocVote from './DocVote.jsx';

const Voting = ({ gameState, day, myId, vote, docChoice, role, preGame }) => {
  // const [voting, setVoting] = useState(false);
  let voting = false
  let myPlayer = null
  for (let x = 0; x < gameState.players.length; x++) {
    let player = gameState.players[x]
    if (myId === player.id) {
      myPlayer = player
      break
    }
  }
  if (myPlayer.alive && day) {
    voting = true
  } else if (!day && myPlayer.role === 'werewolf' && myPlayer.alive) {
    voting = true
  }
  // else if (myPlayer.role === 'werewolf' && !day && myPlayer.alive) {
  //   setVoting(true)
  // }
  if (preGame) {
    return null;
  }
  if (voting) {
    return (
      <div>
        {role === 'werewolf' ? <h3>Choose your victim!</h3> : null}
        {gameState.players.map((player) => {
          if (day) {
            if (player.id !== myId && player.alive) {
              return <button onClick={() => { vote(player.id) }}>{player.name}</button>
            }
          } else {
            if (player.id !== myId && player.role !== 'werewolf' && player.alive) {
              return <button onClick={() => { vote(player.id) }}>{player.name}</button>
            }
          }
        })}
      </div>
    )
  }
  if (!myPlayer.alive) {
    return <h1>YOU ARE DEAD</h1>
  }
  if (myPlayer.role === 'doctor') {
    return <DocVote docChoice={docChoice} gameState={gameState} myId={myId} />
  }
  if (myPlayer.role === 'seer') {
    return <SeerVote gameState={gameState} myId={myId} />
  }
  return <h1>Beware! Werewolves are on the hunt!</h1>
}

export default Voting;

