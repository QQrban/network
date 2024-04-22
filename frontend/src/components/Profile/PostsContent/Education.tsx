import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Item } from "@/components/shared/Item";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";

interface EducationProps {
  name: string;
  fieldOfStudy: string;
  years: string;
}

export default function Education() {
  const EducationItem: EducationProps[] = [
    {
      name: "Kood/Jõhvi",
      fieldOfStudy: "Software Engineering",
      years: "2023-2025",
    },
    {
      name: "FoxmindEd",
      fieldOfStudy: "Frontend Development",
      years: "2023-2024",
    },
    {
      name: "Gamma Intelligence",
      fieldOfStudy: "Frontend Development",
      years: "2023-2024",
    },
  ];

  return (
    <Item
      sx={{
        mt: "23px",
      }}
      radius="8px"
    >
      <Box
        sx={{
          p: "10px 17px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontSize={20}>Education</Typography>
        <BorderColorIcon sx={{ fontSize: "25px", color: "#2a2a2a" }} />
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
        {EducationItem.map((education) => (
          <Box
            key={education.name}
            sx={{
              display: "flex",
              gap: "12px",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                {education.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 15,
                  color: "#797979",
                }}
              >
                {education.fieldOfStudy}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#8F8F8F",
                }}
              >
                {education.years}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Item>
  );
}
