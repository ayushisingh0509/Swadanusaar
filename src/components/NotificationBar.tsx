
import { useState, useEffect } from "react";
import { X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NotificationBarProps {
  message: string;
  type?: "info" | "success" | "warning";
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const NotificationBar = ({
  message,
  type = "info",
  onClose,
  autoClose = true,
  duration = 5000,
}: NotificationBarProps) => {
  const [isVisible, setIsVisible] = useState(true);

  // Color classes based on type
  const colorClasses = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-cuisine-beige border-cuisine-light-orange text-cuisine-orange",
  };

  // Icon based on type
  const getIcon = () => {
    switch (type) {
      case "info":
      case "success":
      case "warning":
        return <Bell className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (autoClose) {
      timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose();
        }
      }, duration);
    }
    
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [autoClose, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 border rounded-lg transition-all",
        colorClasses[type]
      )}
    >
      <div className="flex items-center space-x-3">
        {getIcon()}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={handleClose}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NotificationBar;
