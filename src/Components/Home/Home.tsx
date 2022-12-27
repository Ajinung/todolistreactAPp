import React from "react";
import styled from "styled-components";
import LandingPage from "../Todolist/LandingPage";

const Home = () => {
  return (
    <div>
      <Container>
        <LandingPage />
      </Container>
    </div>
  );
};

export default Home;

const Container = styled.div`
  background-color: #241d33;
  color: #ffffffda;
`;
