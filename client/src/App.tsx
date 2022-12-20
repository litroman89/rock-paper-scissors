import React from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { css } from '@emotion/css'
import Player from './entities/Player';
import Score from './entities/Score';

const socket = io('http://localhost:4000');

const App: React.FC = () => {

  return (
    <div className={css `
      width: 500px;
      margin: 0 auto;
      text-align: center;
    `}>
      <p>Hello here!</p>
      <Score socket={socket}/>
      <Player socket={socket}/>
    </div>
  );
}

export default App;
