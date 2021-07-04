import { styled } from "../theme";
import { Layout } from "./Layout.component";

export const Button = styled(Layout.PressableColumn).attrs(({ theme }) => {
  return {
    hitSlop: { top: 20, right: 20, bottom: 20, left: 20 },
    py: theme.sizes["m-18"],
    px: theme.sizes["m-18"],
    center: true,
  };
})`
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.buttonBlue};
`;
