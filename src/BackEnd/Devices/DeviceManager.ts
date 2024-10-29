import { BluetoothButton } from "./BluetoothButton";
import { Device } from "./Device";

export class DeviceManager {
    // Private static instance of DeviceManager
    private static instance: DeviceManager;

    // Private property to hold devices
    private devices: Device[] = [];

    // Private constructor prevents instantiation
    private constructor() {}

    // Static method to get the singleton instance
    static getInstance(): DeviceManager {
        if (!DeviceManager.instance) {
            DeviceManager.instance = new DeviceManager();
        }
        return DeviceManager.instance;
    }

    registerBlueToothButton(name: string): void {
        this.devices.push(new BluetoothButton(name));
    }

    // Method to get all buttons
    getDevices(): Device[] {
        return this.devices;
    }
}
