import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiArrowPath, HiHome, HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <DarkModeToggle />
        <ButtonIcon>
          <Logout />
        </ButtonIcon>
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
