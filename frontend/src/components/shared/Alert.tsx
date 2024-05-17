import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";

interface Props {
  severity: "error" | "warning" | "info" | "success";
  text: string;
  icon: React.ReactNode;
}

export default function SimpleAlert({ severity, text, icon }: Props) {
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;
  return (
    <Alert icon={icon} severity={severity}>
      {text}
    </Alert>
  );
}
