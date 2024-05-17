import { Box, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

interface EducationProps {
  name: string;
  fieldOfStudy: string;
  years: string;
}

interface EducationComponentProps {
  size: "small" | "medium" | "large";
}

export default function Education({ size }: EducationComponentProps) {
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
    <>
      {EducationItem.map((education) => (
        <Box
          key={education.name}
          sx={{
            display: "flex",
            gap: "12px",
          }}
        >
          <SchoolIcon fontSize={size} sx={{ color: "#6495ED" }} />
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
    </>
  );
}
