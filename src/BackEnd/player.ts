

export class Player {
    name: string;
    score: number;
    loggedIn: boolean = false;
    Admin: boolean = false;
    playing : boolean = false;
  
    constructor(name: string, score: number = 0)   {
      this.name = name;
      this.score = score;

    }
  

    startPlaying = (): void => {
        this.playing = true;
    }

    
    
    // Method to display player information
    getInfo(): string {
      return `${this.name} has  ${this.score} score.`;
    }
  
  

  
  
  }
  