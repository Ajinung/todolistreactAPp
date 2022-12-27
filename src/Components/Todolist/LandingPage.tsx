import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");

  const addUser = () => {
    window.localStorage.setItem("username", JSON.stringify(name));
    navigate("/todolist");
  };

  return (
    <div>
      <Container>
        <Wrapper>
          <h2>Welcome to your TodoList 📝</h2>
          <h3>please fill in your name to start creating today's task</h3>
          <InputField
            placeholder="please fill in your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {name !== "" ? (
            <Button bg="black" onClick={addUser}>
              get started 📝
            </Button>
          ) : (
            <Button bg="silver">get started 📝</Button>
          )}
        </Wrapper>
        <p>developed by Isaac Etor</p>
      </Container>
    </div>
  );
};

export default LandingPage;

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    width: 80%;
  }

  h2 {
    font-size: 40px;
    margin: 0;
    text-transform: capitalize;
    text-align: center;

    @media screen and (max-width: 768px) {
      font-size: 30px;
    }
  }

  h3 {
    margin: 0;
    margin-top: 15px;
    font-weight: 500;
    margin-bottom: 30px;
    font-weight: 100;
    text-align: center;

    @media screen and (max-width: 768px) {
      font-size: 15px;
    }
  }
`;

const Button = styled.button<{ bg: string }>`
  padding: 10px 70px;
  margin-top: 30px;
  background-color: ${(props) => props.bg};
  color: #fff;
  border: 0;
  font-weight: 500;
  font-size: 16px;
  transition: all 360ms;

  :hover {
    opacity: 0.97;
    cursor: pointer;
    transform: scale(0.98);
  }
`;
const InputField = styled.input`
  width: 70%;
  padding: 15px;
  border: 0;
  outline: 0;
  padding-left: 20px;
  font-size: 16px;

  :focus {
    outline: 1px solid black;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;
