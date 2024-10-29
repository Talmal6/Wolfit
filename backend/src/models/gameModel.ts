export class Game {
    players: string[];
  
    constructor(players: string[]) {
      this.players = players;
    }
  
    start() {
      // Game starting logic
      console.log(`Game started with players: ${this.players}`);
    }
  }
  