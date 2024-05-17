import { Tooltip, Typography } from "@mui/material";
import { TooltipProps } from "@mui/material";

interface TooltipStyledProps extends TooltipProps {
  title: string;
  children: React.ReactElement;
}

export default function TooltipStyled({ title, children }: TooltipStyledProps) {
  return (
    <Tooltip
      title={
        <Typography
          sx={{
            fontFamily: "Schoolbell !important",
            letterSpacing: "2px",
          }}
          fontSize={19}
        >
          {title}
        </Typography>
      }
    >
      {children}
    </Tooltip>
  );
}
