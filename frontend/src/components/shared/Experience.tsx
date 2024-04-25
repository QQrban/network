import { Item } from "@/components/shared/Item";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box, Button, Divider, Typography } from "@mui/material";

interface ExperienceProps {
  name: string;
  fieldOfStudy: string;
  years: string;
  location: string;
  description: string;
}

export default function Experience() {
  const ExperienceItems: ExperienceProps[] = [
    {
      name: "Kood/Jõhvi",
      fieldOfStudy: "Software Engineering",
      years: "2023-2025",
      location: "Tallinn, Estonia",
      description: "",
    },
    {
      name: "Kood/Jõhvi",
      fieldOfStudy: "Software Engineering",
      years: "2023-2025",
      location: "Tallinn, Estonia",
      description: "",
    },
    {
      name: "Kood/Jõhvi",
      fieldOfStudy: "Software Engineering",
      years: "2023-2025",
      location: "Tallinn, Estonia",
      description: "",
    },
    {
      name: "Kood/Jõhvi",
      fieldOfStudy: "Software Engineering",
      years: "2023-2025",
      location: "Tallinn, Estonia",
      description: "",
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
        <Typography fontSize={20}>Experience</Typography>
        <Button>
          <BorderColorIcon sx={{ color: "#2a2a2a" }} />
        </Button>
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
        {ExperienceItems.length >= 1 ? (
          ExperienceItems.map((experience, index) => (
            <Box
              key={index}
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
                  {experience.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 15,
                    color: "#797979",
                  }}
                >
                  {experience.fieldOfStudy}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#8F8F8F",
                  }}
                >
                  {experience.years}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#8F8F8F",
                  }}
                >
                  {experience.location}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography
            sx={{
              fontSize: "24px",
            }}
          >
            No experience yet!
          </Typography>
        )}
      </Box>
    </Item>
  );
}
