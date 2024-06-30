import styled from "styled-components";

interface ProgressBarProps {
  progress: number;
}

const ProgressBarContainer = styled.div`
  margin-top: 5rem;
  width: 100%;
  background-color: ${(props) => props.theme.pureWhite};
  border-radius: 1rem;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  background-color: ${(props) => props.theme.purple};
  height: 0.8rem;
  transition: width 0.3s ease-in-out;
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarFill progress={progress} />
    </ProgressBarContainer>
  );
};
