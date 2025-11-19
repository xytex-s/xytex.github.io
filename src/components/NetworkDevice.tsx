import { Monitor, Wifi, Server, HardDrive, Globe, X } from "lucide-react";
import { DeviceType } from "./DeviceToolbar";
import { Button } from "@/components/ui/button";

interface NetworkDeviceProps {
  id: string;
  type: DeviceType;
  x: number;
  y: number;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDragStart: (e: React.MouseEvent) => void;
}

const deviceIcons: Record<DeviceType, React.ReactNode> = {
  pc: <Monitor className="h-8 w-8" />,
  router: <Wifi className="h-8 w-8" />,
  switch: <HardDrive className="h-8 w-8" />,
  server: <Server className="h-8 w-8" />,
  cloud: <Globe className="h-8 w-8" />,
};

const deviceColors: Record<DeviceType, string> = {
  pc: "bg-blue-500",
  router: "bg-green-500",
  switch: "bg-purple-500",
  server: "bg-orange-500",
  cloud: "bg-cyan-500",
};

export const NetworkDevice = ({
  id,
  type,
  x,
  y,
  label,
  isSelected,
  onSelect,
  onDelete,
  onDragStart,
}: NetworkDeviceProps) => {
  return (
    <div
      className={`absolute cursor-move select-none ${isSelected ? "z-10" : "z-0"}`}
      style={{ left: x, top: y }}
      onClick={onSelect}
      onMouseDown={onDragStart}
    >
      <div
        className={`relative flex flex-col items-center gap-2 p-3 rounded-lg ${
          deviceColors[type]
        } text-white shadow-lg transition-all ${
          isSelected ? "ring-4 ring-ring scale-110" : ""
        }`}
      >
        {isSelected && (
          <Button
            size="icon"
            variant="destructive"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
        {deviceIcons[type]}
        <span className="text-xs font-medium">{label}</span>
      </div>
    </div>
  );
};
