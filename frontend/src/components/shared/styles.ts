import { Button, styled } from "@mui/material";
import successBtn from "../../../public/icons/successBtn.svg";

export const SuccessBtn = styled(Button)`
  margin-top: 10px;
  align-self: center;
  height: 50px;
  font-family: Schoolbell;
  font-size: 30px;
  width: 100%;
  background: url(${successBtn.src});
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #2a2a2a;
  border-radius: 6px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
`;
