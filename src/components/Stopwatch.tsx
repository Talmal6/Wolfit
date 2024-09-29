// Stopwatch.tsx
import React, { useState, useEffect, useRef } from 'react';
import './Stopwatch.css';
import { ClimbGame } from '../BackEnd/Games/ClimbGame';

interface StopwatchProps {
  names: string[];
}

const Stopwatch: React.FC<StopwatchProps> = ({ names }) => {
  const [time, setTime] = useState<number>(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const [game, setGame] = useState<ClimbGame | null>(null);
  const [playerTimes, setPlayerTimes] = useState<Map<string, number>>(new Map());

  // Start the stopwatch and game
  const start = () => {
    if (!isRunning) {
      const newGame = new ClimbGame(names);
      newGame.startGame();
      setGame(newGame);

      setIsRunning(true);
      intervalRef.current = window.setInterval(() => {
        setTime(newGame.getTime());
      }, 10); // Update every 10 milliseconds
    }
  };

  // Stop the stopwatch
  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    }
  };

  // Reset the stopwatch
  const reset = () => {
    stop();
    setTime(0);
    setGame(null);
    setPlayerTimes(new Map());
  };

  // Handle when a player finishes
  const handlePlayerFinish = (playerName: string) => {
    if (game) {
      game.recordPlayerFinish(playerName);
      // Update player times state
      const newPlayerTimes = new Map(playerTimes);
      newPlayerTimes.set(playerName, game.playersTime.get(game.players.find(p => p.name === playerName)!)!);
      setPlayerTimes(newPlayerTimes);
    }
  };

  // Clean up the interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="stopwatch">
      <div className="display">
        <span className="minutes">
          {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
        </span>
        <span className="seconds">
          {('0' + Math.floor((time / 1000) % 60)).slice(-2)}:
        </span>
        <span className="milliseconds">
          {('0' + Math.floor((time / 10) % 100)).slice(-2)}
        </span>
      </div>
      <div className="controls">
        <button onClick={start} className="btn start">
          {isRunning ? 'Running' : 'Start'}
        </button>
        <button onClick={stop} className="btn stop">
          Stop
        </button>
        <button onClick={reset} className="btn reset">
          Reset
        </button>
        <br />
      </div>
      {names.length > 0 && (
        <div className="names">
          <h2>Players</h2>
          <div className="participants" style={{ display: 'flex', flexDirection: 'row' }}>
            {names.map((name, index) => (
              <div key={index} className="participant" style={{ marginRight: '10px' }}>
                <div className="name-box">
                  {name}
                  <br />
                  {/* Display player's time if available */}
                  {playerTimes.get(name) !== undefined ? (
                    <span>Time: {playerTimes.get(name)} ms</span>
                  ) : (
                    <button onClick={() => handlePlayerFinish(name)}>Finish</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
