import React from "react";
import styled from "styled-components";

interface iData {
  id: number;
  status: boolean;
  todo: string;
  Desc: string;
  Date: string;
}

const Todolist = () => {
  const [todoValue, setTodoValue] = React.useState<string>("");
  const [desc, setDesc] = React.useState<string>("");
  const [date, setDate] = React.useState("");
  const [date1, setDate2] = React.useState("");
  const [data, setData] = React.useState<iData[]>(
    [
      // {
      //   id: 1,
      //   status: true,
      //   todo: "This is a todo",
      //   Date: date,
      //   Desc: desc,
      // },
      // {
      //   id: 2,
      //   status: false,
      //   todo: "This is a todo2",
      //   Date: date,
      //   Desc: desc,
      // },
    ]
    //   .sort((a, b) => {
    //   return a + b;
    // })
  );

  const [edit, setEdit] = React.useState(-1);
  const [saveEdit, setSaveEdit] = React.useState("");
  const [NewsaveEdit, NewsetSaveEdit] = React.useState(true);
  const localData = JSON.parse(window.localStorage.getItem("username") || "");
  const [show, SetShow] = React.useState(false);
  const rand = Math.floor(Math.random() * 1000) + 4000;

  const Toggle = (id: number) => {
    SetShow(true);
  };

  const addNewTask = () => {
    setData((prev) => [
      ...prev,
      {
        id: rand,
        status: false,
        todo: todoValue,
        Date: date,
        Desc: desc,
      },
    ]);
  };

  const rmvValue = (id: number) => {
    let myfilter = data.filter((el) => el.id !== id);
    setData(myfilter);
  };

  const editField = (id: number) => {
    setEdit(id);
  };

  const newSaveEdit = (id: number) => {
    const updatedTodo = [...data].map((todo) => {
      if (todo.id === id) {
        todo.todo = saveEdit;
      }
      return todo;
    });

    setData(updatedTodo);
  };

  const saveEditTitle = () => {
    NewsetSaveEdit(!NewsaveEdit);
  };
  const unsaveEdit = () => {
    NewsetSaveEdit(!NewsaveEdit);
  };

  // const doneTask = (id: number) => {
  //   let myFilter = data.filter((el) => el.id === id);
  //   setData(myFilter);
  //   SetShow(myFilter);
  // };

  const colors = [
    "#ad0cf8",
    "#1080f8",
    "#93db03",
    "#e4aa0a",
    "#e2047b",
    "#ffffffdd",
  ];

  return (
    <div>
      <Container>
        <NewTaskWrapper>
          <h2>welcome {localData.toUpperCase()}</h2>
          <h3>let's create a task for today</h3>

          <InputField
            placeholder="What do you plan on achieving today?"
            onChange={(e) => {
              setTodoValue(e.target.value);
            }}
          />

          {todoValue !== "" ? (
            <TextHold>
              <textarea
                name=""
                id=""
                cols={30}
                rows={5}
                placeholder="Tell us a bit more about this task..."
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              ></textarea>
              <TimeHold>
                <span>
                  <label htmlFor="">
                    Select Start time:
                    <DateTask
                      type="time"
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </label>
                </span>

                <div>
                  <label htmlFor="">
                    Select Stop time:
                    <DateTask
                      type="time"
                      onChange={(e) => {
                        setDate2(e.target.value);
                      }}
                    />
                  </label>
                </div>
              </TimeHold>
            </TextHold>
          ) : null}
        </NewTaskWrapper>

        {todoValue !== "" && desc !== "" && date !== "" ? (
          <Button bg="silver" cursor="pointer" onClick={addNewTask}>
            {" "}
            Create task
          </Button>
        ) : (
          <Button bg="" cursor="default" disabled>
            Create task
          </Button>
        )}

        <br />
        <br />

        <h4>All task</h4>
        <CardHolder>
          {data?.map((props) => (
            <Card
              key={props.id}
              bg={`${colors[Math.floor(Math.random() * colors.length)]}`}
            >
              {props.id === edit ? (
                <input
                  defaultValue={props.todo}
                  onChange={(e) => {
                    setSaveEdit(e.target.value);
                  }}
                />
              ) : (
                <Title>{props.todo}</Title>
              )}
              <Desc>{props.Desc}</Desc>
              <StartEnd>
                <First>
                  <p>Start time:</p>
                  <span>{props.Date}</span>
                </First>
                <First>
                  <p>Stop time:</p>
                  <span>{props.Date}</span>
                </First>
              </StartEnd>

              <BtnHold>
                {props.id === edit ? (
                  <button
                    onClick={() => {
                      newSaveEdit(props.id);
                      unsaveEdit();
                    }}
                  >
                    save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      editField(props.id);
                      saveEditTitle();
                    }}
                  >
                    Edit
                  </button>
                )}

                <button
                  // onClick={() => {
                  //   doneTask(props.id);
                  // }}

                  onClick={() => {
                    Toggle(props.id);
                  }}
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    rmvValue(props.id);
                  }}
                >
                  Delete
                </button>
              </BtnHold>

              <p>
                task created on {new Date().toLocaleDateString()} <br /> at:{" "}
                {new Date().toLocaleTimeString()}
              </p>

              {show ? (
                <TaskDone>
                  <p>Hurray! you completed this task for today. 🎉🎉</p>
                </TaskDone>
              ) : null}
            </Card>
          ))}
        </CardHolder>

        <p>developed by Isaac Etor</p>
      </Container>
    </div>
  );
};

export default Todolist;

const TaskDone = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /* backdrop-filter: blur(2.5px) grayscale(1); */
  background-color: #ffffffdd;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    margin: 0;
    font-size: 25px;
    font-weight: 600;
    color: #000;
    margin: 5px 10px;
  }

  blockquote {
    font-weight: 600;
    font-style: oblique;
  }
`;
const TextHold = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  textarea {
    width: 90%;
    padding: 15px;
    border: 0;
    outline: 0;
    font-size: 16px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    transition: all 350ms;
    margin-top: 10px;
  }
`;

const NewTaskWrapper = styled.div`
  width: 600px;
  padding: 20px;
  margin: 20px auto;
  border: 5px solid transparent;
  border-image: linear-gradient(
    to bottom right,
    #b827fc 0%,
    #2c90fc 25%,
    #b8fd33 50%,
    #fec837 75%,
    #fd1892 100%
  );
  border-image-slice: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #241d33;
  margin-top: 30px;

  @media screen and (max-width: 600px) {
    width: 80%;
  }

  h2 {
    font-size: 30px;
    margin: 0;
    text-transform: capitalize;
    font-weight: 500;
    text-align: center;

    @media screen and (max-width: 500px) {
      font-size: 1.5rem;
    }
  }

  h3 {
    margin: 0;
    margin-top: 10px;
    font-weight: 100;
    margin-bottom: 30px;
  }
`;

const Desc = styled.div``;

const First = styled.div`
  p {
    font-weight: 500;
  }
`;

const StartEnd = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  /* margin-bottom: 20px; */
`;
const DateTask = styled.input`
  width: 150px;
  height: 30px;
  outline: 0;
  border: 0;
  font-size: 16px;
  background-color: #fff;
  margin-left: 10px;
`;

const TimeHold = styled.div`
  width: 95%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  label {
    margin-right: 10px;
    font-size: 14px;
  }
`;
const CardHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Title = styled.p`
  width: 100%;
  font-size: 20px;
  margin: 0;
  border-bottom: 5px solid transparent;
  border-image: linear-gradient(
    to bottom right,
    #b827fc 0%,
    #2c90fc 25%,
    #b8fd33 50%,
    #fec837 75%,
    #fd1892 100%
  );

  border-image-slice: 1;
  padding: 10px;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 10px;
`;
const Card = styled.div<{ bg: string }>`
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  width: 300px;
  background-color: ${(props) => props.bg};
  padding: 30px;
  margin: 10px 10px;
  color: #000;
  position: relative;

  /* ::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    backdrop-filter: blur(1.7px) grayscale(1);
  } */
  input {
    width: 100%;
    height: 40px;
    outline: 0;
    padding-left: 10px;
    font-size: 15px;
    margin-bottom: 15px;
    border: 0;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;
const BtnHold = styled.div`
  margin-top: 15px;
  button {
    cursor: pointer;
    margin-right: 5px;
    padding: 10px 25px;
    background-color: #fff;
    font-size: 15px;
    font-weight: 500;
    outline: 0;
    border: 0;
    transition: all 350ms;
    &:hover {
      transform: scale(0.95);
      background-color: #f3f2f2;
    }
  }
`;

const Button = styled.button<{ bg: string; cursor: string }>`
  padding: 15px 80px;
  margin-top: 30px;
  background-image: ${(props) => props.bg};
  color: #000;
  font-weight: 600;
  font-size: 16px;
  transition: all 360ms;
  border: 0;
  text-transform: capitalize;

  :hover {
    opacity: 0.97;
    cursor: ${(props) => props.cursor};
    transform: scale(0.98);
  }
`;
const InputField = styled.input`
  width: 90%;
  padding: 15px;
  border: 0;
  outline: 0;
  padding-left: 20px;
  font-size: 16px;
  transition: all 350ms;

  :focus {
    outline: 1px solid black;
  }
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #241d33;
  color: #ffffffe1;
`;
