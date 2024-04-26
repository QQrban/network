import { Box, Typography } from "@mui/material";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";

interface ExperienceProps {
  name: string;
  fieldOfStudy: string;
  years: string;
  location: string;
  description: string;
}

interface ExperienceComponentProps {
  size: "small" | "medium" | "large";
}

export default function Experience({ size }: ExperienceComponentProps) {
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
    <>
      {ExperienceItems.length >= 1 ? (
        ExperienceItems.map((experience, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              gap: "12px",
            }}
          >
            <HomeRepairServiceIcon fontSize={size} sx={{ color: "#6495ED" }} />
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
    </>
  );
}
