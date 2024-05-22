import { Box } from "@mui/material";
import Image from "next/image";
import noPhoto from "../../../public/icons/profile.svg";

interface ProfileImageProps {
  image: string | null;
  width: number;
  height: number;
}

export default function ProfileImage({
  image,
  width,
  height,
}: ProfileImageProps) {
  return (
    <Box
      sx={{
        width: width,
        height: height,
        border: "2px solid #4a4a4a",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <Image
        width={width}
        height={height}
        src={image ? `http://localhost:8888/file/${image}` : noPhoto}
        alt="no prof pic"
      />
    </Box>
  );
}
