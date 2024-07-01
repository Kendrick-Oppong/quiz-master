import styled from "styled-components";

const NotFoundText = styled.p`
  font-weight: 500;
  font-size: 1.4rem;
  text-align: center;
`;

export const NotFound = () => {
  return (
    <div>
      <NotFoundText>Page Not found</NotFoundText>
    </div>
  );
};
