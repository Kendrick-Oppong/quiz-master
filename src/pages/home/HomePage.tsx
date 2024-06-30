import styled from "styled-components";
import { lightTheme } from "../../styles/themes";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

interface BgColorProps {
  bgColor: keyof typeof lightTheme;
}

const Main = styled.main`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const WelcomeDiv = styled.div`
  h1 {
    font-size: 4rem;
    font-weight: 300;

    span {
      font-weight: bold;
    }

    @media (max-width: 768px) {
      font-size: 3rem;
    }
  }

  p {
    font-size: 1.3rem;
    margin-top: 2rem;
    font-style: italic;
    color: ${(props) => props.theme.greyNavy};

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ListItem = styled.li<BgColorProps>`
  display: flex;
  align-items: center;
  padding: 1rem 1.8rem;
  gap: 1.4rem;
  cursor: pointer;
  font-size: 1.75rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.pureWhite};
  transition: background-color 0.3s ease-in-out;

  /* Ensure list items are focusable and have appropriate hover styles */
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme[props.bgColor]};
  }

  p {
    font-weight: 500;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const IconImage = styled.img<BgColorProps>`
  background-color: ${(props) => props.theme[props.bgColor]};
  border-radius: 5px;
  padding: 0.5rem;
`;

export const HomePage = () => {
  const listItemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(0);

  useEffect(() => {
    // Focus the first list item initially when the component mounts
    if (listItemRefs.current.length > 0) {
      listItemRefs.current[0]?.focus();
    }
  }, []);

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLLIElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      event.currentTarget.click(); // Trigger click when Enter key is pressed
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const newIndex =
        focusedItemIndex > 0
          ? focusedItemIndex - 1
          : listItemRefs.current.length - 1;
      setFocusedItemIndex(newIndex);
      listItemRefs.current[newIndex]?.focus();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const newIndex =
        focusedItemIndex < listItemRefs.current.length - 1
          ? focusedItemIndex + 1
          : 0;
      setFocusedItemIndex(newIndex);
      listItemRefs.current[newIndex]?.focus();
    }
  };

  return (
    <Main>
      <WelcomeDiv>
        <h1>
          Welcome to the <span>Frontend Quiz!</span>
        </h1>
        <p>Pick a subject to get started.</p>
      </WelcomeDiv>
      <ListContainer>
        <Link to="/subject/HTML">
          <ListItem
            ref={(el) => listItemRefs.current.push(el)}
            bgColor="htmlBg"
            tabIndex={0} // Ensure list item is focusable
            onKeyDown={(e) => handleKeyPress(e, 0)} // Handle keyboard events
            aria-label="HTML"
            role="option"
            aria-selected={focusedItemIndex === 0 ? "true" : "false"}
            style={{
              backgroundColor:
                focusedItemIndex === 0
                  ? lightTheme.htmlBg
                  : lightTheme.pureWhite,
            }}
          >
            <IconImage
              src="/assets/images/icon-html.svg"
              alt="HTML Icon"
              bgColor="htmlBg"
            />
            <p>HTML</p>
          </ListItem>
        </Link>
        <Link to="/subject/CSS">
          <ListItem
            ref={(el) => listItemRefs.current.push(el)}
            bgColor="cssBg"
            tabIndex={0}
            onKeyDown={(e) => handleKeyPress(e, 1)}
            aria-label="CSS"
            role="option"
            aria-selected={focusedItemIndex === 1 ? "true" : "false"}
            style={{
              backgroundColor:
                focusedItemIndex === 1
                  ? lightTheme.cssBg
                  : lightTheme.pureWhite,
            }}
          >
            <IconImage
              src="/assets/images/icon-css.svg"
              alt="CSS Icon"
              bgColor="cssBg"
            />
            <p>CSS</p>
          </ListItem>
        </Link>
        <Link to="/subject/JavaScript">
          <ListItem
            ref={(el) => listItemRefs.current.push(el)}
            bgColor="jsBg"
            tabIndex={0}
            onKeyDown={(e) => handleKeyPress(e, 2)}
            aria-label="JavaScript"
            role="option"
            aria-selected={focusedItemIndex === 2 ? "true" : "false"}
            style={{
              backgroundColor:
                focusedItemIndex === 2 ? lightTheme.jsBg : lightTheme.pureWhite,
            }}
          >
            <IconImage
              src="/assets/images/icon-js.svg"
              alt="JavaScript Icon"
              bgColor="jsBg"
            />
            <p>JavaScript</p>
          </ListItem>
        </Link>
        <Link to="/subject/Accessibility">
          <ListItem
            ref={(el) => listItemRefs.current.push(el)}
            bgColor="accessibilityBg"
            tabIndex={0}
            onKeyDown={(e) => handleKeyPress(e, 3)}
            aria-label="Accessibility"
            role="option"
            aria-selected={focusedItemIndex === 3 ? "true" : "false"}
            style={{
              backgroundColor:
                focusedItemIndex === 3
                  ? lightTheme.accessibilityBg
                  : lightTheme.pureWhite,
            }}
          >
            <IconImage
              src="/assets/images/icon-accessibility.svg"
              alt="Accessibility Icon"
              bgColor="accessibilityBg"
            />
            <p>Accessibility</p>
          </ListItem>
        </Link>
      </ListContainer>
    </Main>
  );
};
