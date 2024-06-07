import { Box } from "@mui/material";

interface PostImageProps {
  image: string;
  width: string;
  height: string;
  onClick: () => void;
}

export default function PostImage({
  image,
  width,
  height,
  onClick,
}: PostImageProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: width,
        height: height,
        alignSelf: "flex-start",
        m: "0 auto",
        background: `url(http://localhost:8888/file/${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "#838383",
        cursor: "pointer",
        transition: "0.4s",
        "&:hover": {
          scale: "1.1",
        },
      }}
    ></Box>
  );
}
