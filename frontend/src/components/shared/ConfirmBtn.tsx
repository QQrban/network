import { SuccessBtn } from "./styles";

interface ConfirmBtnProps {
  text: string;
  backgroundImage: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | undefined;
}

export default function ConfirmBtn({
  text,
  backgroundImage,
  onClick,
  type,
}: ConfirmBtnProps) {
  return (
    <SuccessBtn
      type={type}
      onClick={onClick}
      sx={{
        fontSize: "20px",
        height: "44px",
        mt: 0,
        backgroundImage: `url(${backgroundImage})`,
        "&:hover": {
          filter: "brightness(92%)",
        },
      }}
    >
      {text}
    </SuccessBtn>
  );
}
