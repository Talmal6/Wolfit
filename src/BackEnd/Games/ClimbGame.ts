// ClimbGame.ts
import { Player } from '../player';

export class ClimbGame {
  players: Player[] = [];
  startTime: number = 0;
  playersTime: Map<Player, number> = new Map();

  constructor(names: string[]) {
    this.initGame(names);
  }

  initGame = (names: string[]): void => {
    if (names.length === 0) {
      throw new Error('No player names provided');
    }
    for (let i = 0; i < names.length; i++) {
      this.players.push(new Player(names[i], 0));
    }
  };

  startGame = (): void => {
    this.startTime = Date.now();
    this.players.forEach((player) => {
      player.startPlaying();
    });
  };

  recordPlayerFinish = (playerName: string): void => {
    const player = this.players.find((p) => p.name === playerName);
    if (player && player.playing) {
      const timeElapsed = Date.now() - this.startTime;
      this.playersTime.set(player, timeElapsed);
      player.playing = false;
    }
  };

  getTime = (): number => {
    return Date.now() - this.startTime;
  };

  getScores = (): Map<Player, number> => {
    return this.playersTime;
  };
}
