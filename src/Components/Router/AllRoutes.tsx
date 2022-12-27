import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../Home/Home";
import Todolist from "../Todolist/Todolist";

const AllRoutes = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/todolist",
      element: <Todolist />,
    },
  ]);
  return elements;
};

export default AllRoutes;
