import React from 'react';
import { useEffect, useState } from 'react';
import { css } from '@emotion/css'

const Score: React.FC<any> = ({socket}: any) => {
  const [usernames, setUsernames] = useState<string[]>([])
  const [userSelected, setUserSelected] = useState<number>(0)
  const [firstPlayerScore, setFirstPlayerScore] = useState<number>(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState<number>(0);

  useEffect(() => {
    socket.on('usersList', (data: string[]): void => setUsernames(data))
    
    socket.on("whoSelectedElement", (data: number) => {
      setUserSelected(data);
      console.log(data)
    });

    socket.on("whoWinner", (data: string) => {
      switch (data) {
        case 'draw':
          setUserSelected(0);
          break;
        case 'player 1':
          setFirstPlayerScore((firstPlayerScore) => firstPlayerScore + 1);
          setUserSelected(0);
          break;
        case 'player 2':
          setSecondPlayerScore((secondPlayerScore) => secondPlayerScore + 1);
          setUserSelected(0);
          break;
      }
    });

    socket.on('resetScore', (data: any): void => {
      setFirstPlayerScore(0);
      setSecondPlayerScore(0);
    })
  }, [socket])
  
  return (
    <div>
      <div
        className={css `
          display: flex;
          justify-content: space-between;
        `}>
        {usernames.map((name, i) => (
          <div key={name + i}>
            <p>{`Player ${ i + 1 }`}</p>
            
            {/* показуємо ім'я гравців та того хто першим обрав елемент */}
            {(userSelected === i + 1 || userSelected === 0) ? 
              <p>{name}</p>
              : 
              <p>{name}<span className={css`margin-left: 15px; color: #5ebc5e; position: absolute;`}>зробив вибір</span></p>
            }
          </div>
        ))}
        {usernames.length < 2 ? (<div><p>Player 2</p><p>поза грою</p></div>) : null}
      </div>
      <div className={css`
        font-size: 32px;
        text-align: center;
      `}>
            {firstPlayerScore} : {secondPlayerScore}
      </div>
    </div>
  )
}

export default Score;