import { Box, SxProps, Theme, Typography, styled } from "@mui/material";
import { Item } from "../shared/Item";

export const ChatBoxStyles = styled(Box)`
  padding: 30px;
  gap: 40px;
  display: flex;
  overflow: hidden;
  position: relative;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 160px);
`;

export const ItemStyles = styled(Item)`
  padding: 10px 30px;
  background: white;
  z-index: 4;
  width: 460px;
  overflow-x: none;
  overflow-y: scroll;
  padding-bottom: 23px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const ChatContentStyles = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 80px 10px;
  height: 90%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d0d0d0;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #dbdbdb;
  }
`;

export const CenterTextStyles = styled(Typography)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 42px;
  font-family: SchoolBell !important;
`;

export const ErrorTextStyles = styled(Typography)`
  text-align: center;
  font-size: 22px;
  font-family: Gloria Hallelujah !important;
`;
