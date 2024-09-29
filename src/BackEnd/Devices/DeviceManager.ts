
import { BluetoothButton } from "./BluetoothButton";


export class DeviceManager {
    // Private constructor prevents instantiation
    private constructor() {}

    // Static property
    private static BluetoothButtons: BluetoothButton[] = [];

    // Static method to initialize Bluetooth buttons
    static init(): void {

         DeviceManager.BluetoothButtons = [new BluetoothButton("1"), new BluetoothButton("2")];
    }

    // Static method to get all buttons
    static getButtons(): BluetoothButton[] {
        return this.BluetoothButtons;
    }

    // Static method to count buttons
    static countButtons(): number {
        return this.BluetoothButtons.length;
    }
}
