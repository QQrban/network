import { SuccessBtn } from "./styles";

interface ConfirmBtnProps {
  text: string;
  backgroundImage: string;
  onClick?: () => void;
}

export default function ConfirmBtn({
  text,
  backgroundImage,
  onClick,
}: ConfirmBtnProps) {
  return (
    <SuccessBtn
      onClick={onClick}
      sx={{
        width: "120px",
        fontSize: "20px",
        height: "44px",
        mt: 0,
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {text}
    </SuccessBtn>
  );
}
