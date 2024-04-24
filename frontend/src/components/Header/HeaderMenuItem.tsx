import { Box } from "@mui/material";
import Image from "next/image";
import TooltipStyled from "../shared/TooltipStyled";

interface HeaderMenuItemProps {
  logo: string;
  descr: string;
  showNotification: boolean;
}

export default function HeaderMenuItem({
  logo,
  descr,
  showNotification,
}: HeaderMenuItemProps) {
  return (
    <TooltipStyled title={descr}>
      <Box sx={{ position: "relative", cursor: "pointer" }}>
        <Image src={logo} alt={descr} />
        {showNotification ? (
          <Box
            sx={{
              position: "absolute",
              width: 9,
              height: 9,
              bgcolor: "#ED5959",
              top: 0,
              right: "0px",
              borderRadius: "60px",
            }}
            component="span"
          ></Box>
        ) : (
          ""
        )}
      </Box>
    </TooltipStyled>
  );
}
