import { Monitor, Wifi, Server, HardDrive, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export type DeviceType = "pc" | "router" | "switch" | "server" | "cloud";

interface Device {
  type: DeviceType;
  icon: React.ReactNode;
  label: string;
}

const devices: Device[] = [
  { type: "pc", icon: <Monitor className="h-5 w-5" />, label: "PC" },
  { type: "router", icon: <Wifi className="h-5 w-5" />, label: "Router" },
  { type: "switch", icon: <HardDrive className="h-5 w-5" />, label: "Switch" },
  { type: "server", icon: <Server className="h-5 w-5" />, label: "Server" },
  { type: "cloud", icon: <Globe className="h-5 w-5" />, label: "Cloud" },
];

interface DeviceToolbarProps {
  onDeviceSelect: (type: DeviceType) => void;
}

export const DeviceToolbar = ({ onDeviceSelect }: DeviceToolbarProps) => {
  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex gap-2">
        <h2 className="text-sm font-semibold text-foreground mr-4 flex items-center">Devices:</h2>
        {devices.map((device) => (
          <Tooltip key={device.type}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDeviceSelect(device.type)}
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {device.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{device.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
