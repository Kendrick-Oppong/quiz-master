import styled from "styled-components";
import { lightTheme, darkTheme } from "../../styles/themes";
import { Link } from "react-router-dom";
import { useListNavigation } from "../../hooks/useListNavigation";
import { Main } from "../../styles/common";

interface BgColorProps {
  bgColor: keyof typeof lightTheme;
}

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
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.pureWhite} !important;
  transition: background-color 0.3s ease-in-out;

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
  const listItems = ["HTML", "CSS", "JS", "Accessibility"];
  const { listItemRefs, focusedItemIndex, handleKeyPress } =
    useListNavigation<HTMLLIElement>(listItems.length);

  return (
    <Main>
      <WelcomeDiv>
        <h1>
          Welcome to the <span>Frontend Quiz!</span>
        </h1>
        <p>Pick a subject to get started.</p>
      </WelcomeDiv>
      <ListContainer>
        {listItems.map((item, index) => (
          <Link
            to={`/subject/${item === "JS" ? "JavaScript" : item}`}
            key={index}
          >
            <ListItem
              ref={(el) => (listItemRefs.current[index] = el)}
              bgColor={
                `${item.toLowerCase()}Bg` as
                  | keyof typeof lightTheme
                  | keyof typeof darkTheme
              }
              tabIndex={0}
              onKeyDown={(e) => handleKeyPress(e)}
              aria-label={item}
              role="option"
              aria-selected={focusedItemIndex === index ? "true" : "false"}
              style={{
                backgroundColor:
                  focusedItemIndex === index
                    ? lightTheme[
                        `${item.toLowerCase()}Bg` as
                          | keyof typeof lightTheme
                          | keyof typeof darkTheme
                      ]
                    : lightTheme.pureWhite,
              }}
            >
              <IconImage
                src={`/assets/images/icon-${item.toLowerCase()}.svg`}
                alt={`${item} Icon`}
                bgColor={
                  `${item.toLowerCase()}Bg` as
                    | keyof typeof lightTheme
                    | keyof typeof darkTheme
                }
              />
              <p>{item}</p>
            </ListItem>
          </Link>
        ))}
      </ListContainer>
    </Main>
  );
};
