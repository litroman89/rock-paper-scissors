import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { css } from '@emotion/css'
import chooseName from '../features/chooseName';
import Element from './Element';

const Player: React.FC<any> = ({socket}: any) => {
    const [selectedElement, setSelectedElement] = useState<string>('none');
    const [whoIsWinner, setWhoIsWinner] = useState<string | null>(null);

    //вказуємо переможця
    useEffect(() => {
        socket.on('whoWinner', (data: string) => setWhoIsWinner(data))
    }, [socket])
    
    //повертаємо напис "Обери свій елемент"
    useEffect(() => {
        if (whoIsWinner != null) {
            const timer = setTimeout(() => {
                setWhoIsWinner(null);
            }, 2000)

            return () => clearTimeout(timer);
        } else {
            return;
        }
        
    }, [whoIsWinner])

    //дізнаємось ім'я
    useEffect(() => {
        const chosenName: string = chooseName();
        socket.emit('chosenName', chosenName);
    }, [])

    //даємо серверу знати які елементи обрано
    useEffect(() => {
        if (selectedElement !== "none") {
            socket.emit('selectedElement', selectedElement);
        }
    }, [selectedElement])

    //робимо елементи не виділеними
    useEffect(() => {
        socket.on('removeSelected', (data: string) => setSelectedElement(data));
    }, [socket])

    //відслідковуємо який елемент виділяти
    const clickOnElement = (element: string): void => {
        setSelectedElement(element);
    }

  return (
    <div
        className={css`
            text-align: center;
        `}
    >
        {whoIsWinner ? 
            <p className={css`color: #009b77;`}>{whoIsWinner != 'draw' ? 
                `${whoIsWinner} переможець!` : 
                'draw'} </p> : 
            <p>Обери свій елемент</p>
        }
        <div className={css`display: flex; justify-content: space-around;`}>
            <Element elementName='rock' selectedElement={selectedElement} clickOnElement={clickOnElement}/>
            <Element elementName='paper' selectedElement={selectedElement} clickOnElement={clickOnElement}/>
            <Element elementName='scissors' selectedElement={selectedElement} clickOnElement={clickOnElement}/>
        </div>
    </div>
  )
}

export default Player;