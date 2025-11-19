import { useState, useRef, useEffect } from "react";
import { NetworkDevice } from "./NetworkDevice";
import { DeviceType } from "./DeviceToolbar";
import { Button } from "@/components/ui/button";
import { Trash2, Cable } from "lucide-react";
import { toast } from "sonner";

interface Device {
  id: string;
  type: DeviceType;
  x: number;
  y: number;
  label: string;
}

interface Connection {
  id: string;
  from: string;
  to: string;
}

interface NetworkCanvasProps {
  selectedDeviceType: DeviceType | null;
  onDevicePlaced: () => void;
}

export const NetworkCanvas = ({ selectedDeviceType, onDevicePlaced }: NetworkCanvasProps) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [draggingDevice, setDraggingDevice] = useState<string | null>(null);
  const [connectMode, setConnectMode] = useState(false);
  const [connectFrom, setConnectFrom] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const addDevice = (e: React.MouseEvent) => {
    if (!selectedDeviceType || draggingDevice) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left - 40;
    const y = e.clientY - rect.top - 40;

    const newDevice: Device = {
      id: `${selectedDeviceType}-${Date.now()}`,
      type: selectedDeviceType,
      x,
      y,
      label: `${selectedDeviceType.toUpperCase()}-${devices.length + 1}`,
    };

    setDevices([...devices, newDevice]);
    onDevicePlaced();
    toast.success(`${selectedDeviceType.toUpperCase()} added to network`);
  };

  const handleDragStart = (deviceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDraggingDevice(deviceId);
    setSelectedDevice(deviceId);

    const device = devices.find((d) => d.id === deviceId);
    if (device && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left - device.x,
        y: e.clientY - rect.top - device.y,
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingDevice || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.current.x;
    const y = e.clientY - rect.top - dragOffset.current.y;

    setDevices((prev) =>
      prev.map((d) => (d.id === draggingDevice ? { ...d, x, y } : d))
    );
  };

  const handleMouseUp = () => {
    setDraggingDevice(null);
  };

  const deleteDevice = (id: string) => {
    setDevices(devices.filter((d) => d.id !== id));
    setConnections(connections.filter((c) => c.from !== id && c.to !== id));
    setSelectedDevice(null);
    toast.success("Device removed from network");
  };

  const handleDeviceClick = (deviceId: string) => {
    if (connectMode) {
      if (!connectFrom) {
        setConnectFrom(deviceId);
        toast.info("Select second device to connect");
      } else if (connectFrom !== deviceId) {
        const newConnection: Connection = {
          id: `${connectFrom}-${deviceId}`,
          from: connectFrom,
          to: deviceId,
        };
        setConnections([...connections, newConnection]);
        setConnectFrom(null);
        setConnectMode(false);
        toast.success("Devices connected");
      }
    } else {
      setSelectedDevice(deviceId);
    }
  };

  const getDeviceCenter = (deviceId: string) => {
    const device = devices.find((d) => d.id === deviceId);
    if (!device) return { x: 0, y: 0 };
    return { x: device.x + 40, y: device.y + 40 };
  };

  return (
    <div className="relative flex-1 flex flex-col">
      <div className="bg-card border-b border-border p-2 flex gap-2">
        <Button
          variant={connectMode ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setConnectMode(!connectMode);
            setConnectFrom(null);
          }}
        >
          <Cable className="h-4 w-4 mr-2" />
          {connectMode ? "Cancel Connection" : "Connect Devices"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setDevices([]);
            setConnections([]);
            setSelectedDevice(null);
            toast.success("Network cleared");
          }}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>

      <div
        ref={canvasRef}
        className="relative flex-1 bg-background overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
        onClick={addDevice}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          {connections.map((conn) => {
            const from = getDeviceCenter(conn.from);
            const to = getDeviceCenter(conn.to);
            return (
              <line
                key={conn.id}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeDasharray="5,5"
              />
            );
          })}
        </svg>

        {devices.map((device) => (
          <NetworkDevice
            key={device.id}
            {...device}
            isSelected={selectedDevice === device.id || connectFrom === device.id}
            onSelect={() => handleDeviceClick(device.id)}
            onDelete={() => deleteDevice(device.id)}
            onDragStart={(e) => handleDragStart(device.id, e)}
          />
        ))}

        {devices.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-muted-foreground text-lg">
                Select a device from the toolbar and click to place it
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
