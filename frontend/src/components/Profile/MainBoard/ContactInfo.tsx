import BorderColorIcon from "@mui/icons-material/BorderColor";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Item } from "@/components/shared/Item";
import {
  Box,
  Button,
  Divider,
  IconButton,
  SvgIconProps,
  Typography,
} from "@mui/material";

interface ContactInfoProps {
  icon: React.ElementType<SvgIconProps>;
  value: string;
}

export default function ContactInfo() {
  const ContactInfoItems: ContactInfoProps[] = [
    { icon: LocationOnIcon, value: "From Tallinn, Estonia" },
    { icon: EmailIcon, value: "kurban.ramazanovv@gmail.com" },
    { icon: LanguageIcon, value: "https://kurban-portfolio.netlify.app" },
    { icon: CalendarMonthIcon, value: "June 3" },
  ];

  return (
    <Item radius="8px">
      <Box
        sx={{
          p: "10px 17px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontSize={20}>Contact Info</Typography>
        <IconButton>
          <BorderColorIcon sx={{ color: "#2a2a2a" }} />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          p: "10px 17px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {ContactInfoItems.map((item, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <item.icon
              sx={{
                color: "#8F8F8F",
                fontSize: "34epx",
              }}
            />
            <Typography
              sx={{
                color: "#797979",
                fontSize: "15px",
              }}
              component="span"
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Item>
  );
}
