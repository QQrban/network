import { Tooltip, Typography } from "@mui/material";
import { TooltipProps } from "@mui/material";

interface TooltipStyledProps extends TooltipProps {
  title: string;
  children: React.ReactElement;
}

export default function TooltipStyled({
  title,
  children,
  ...restProps
}: TooltipStyledProps) {
  return (
    <Tooltip title={<Typography fontSize={16}>{title}</Typography>}>
      {children}
    </Tooltip>
  );
}
