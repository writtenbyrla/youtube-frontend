import styled from "styled-components";

const Test = styled.div`
  background-color: black;
  color: white;
`;

const StyledMain = styled.main`
  padding-top: 56px;
  display: flex;
`;

const Home = () => {
  return (
    <StyledMain>
      <h1>Home</h1>
      <Test>TEST!</Test>
      {/* http://localhost:3001/watch로 들어가면 상세페이지 같이 뜸 */}
    </StyledMain>
  );
};
export default Home;
