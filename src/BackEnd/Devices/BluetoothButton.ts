export class BluetoothButton {
    buttonSignal: string;
    
    constructor(buttonSignal: string) {
      this.buttonSignal = buttonSignal;
    }

    getSignal(): string {
        return this.buttonSignal;
    }



  }