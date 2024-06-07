import { Button, styled } from "@mui/material";
import successBtn from "../../../public/icons/successBtn.svg";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";

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

export const TextareaAutosize = styled(BaseTextareaAutosize)(
  () => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'Comic Neue', sans-serif;
  font-size: 15px;
  resize: none;
  line-height: 1.5;
  padding: 8px 75px 8px 12px;
  border-radius: 8px;
  color: #1C2025;
  background: #fff;
  border: 2px solid #868686;
  box-shadow: 0px 2px 2px #F3F6F9;
  &:hover {
    border-color: #3399FF;
  }
  &:focus {
    border-color: #3399FF;
    box-shadow: 0 0 0 3px #80BFFF;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
