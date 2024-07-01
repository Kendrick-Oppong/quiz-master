import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getSelectedThemeMode,
  toggleTheme,
} from "../redux/features/themeSlice";

const SwitchWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 55px;
  height: 30px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${(props) => props.theme.purple};
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.purple};
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 5px;
    bottom: 5px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export function ToggleMode() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(getSelectedThemeMode);

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  return (
    <SwitchWrapper>
      <img
        src={
          darkMode
            ? "/assets/images/icon-sun-light.svg"
            : "/assets/images/icon-sun-dark.svg"
        }
        alt=""
        width={30}
        height={30}
      />
      <SwitchLabel htmlFor="toggle">
        <SwitchInput
          type="checkbox"
          id="toggle"
          checked={darkMode}
          onChange={toggleThemeHandler}
        />
        <SwitchSlider />
      </SwitchLabel>
      <img
        src={
          darkMode
            ? "/assets/images/icon-moon-light.svg"
            : "/assets/images/icon-moon-dark.svg"
        }
        alt=""
        width={30}
        height={30}
      />
    </SwitchWrapper>
  );
}
