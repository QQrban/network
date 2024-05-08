import { SuccessBtn } from "./styles";

interface ConfirmBtnProps {
  text: string;
  backgroundImage: string;
}

export default function ConfirmBtn({ text, backgroundImage }: ConfirmBtnProps) {
  return (
    <SuccessBtn
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
