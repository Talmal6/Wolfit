import { DeviceManager } from "./BackEnd/Devices/DeviceManager";
import { BluetoothButton } from "./BackEnd/Devices/BluetoothButton";

interface ShowDevicesProps {
  DM: DeviceManager;
}

const ShowDevices: React.FC<ShowDevicesProps> = ({ DM }) => {
  // Use the DM prop here to avoid the 'never read' error
  console.log(DM);
  return <div>Show Devices Component</div>;
};