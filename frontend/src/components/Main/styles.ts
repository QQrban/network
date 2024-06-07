import { styled } from "@mui/material";
import { Item } from "../shared/Item";
import bgwall from "../../../public/icons/wall.svg";

export const Screen = styled(Item)`
  border: 4px solid #4a4a4a;
  background-image: url(${bgwall.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: calc(100vh - 40px);
  margin: 0 auto;
  overflow-x: none;
  overflow-y: scroll;
  padding-bottom: 23px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b0b0b0;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #ccc;
  }

  @media (max-width: 613px) {
    height: calc(100vh - 100px);
  }
`;
