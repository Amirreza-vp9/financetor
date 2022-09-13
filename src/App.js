import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Me from "./query/me";
import SignIn from "./sign/signIn";
import SignUp from "./sign/signUp";
import Weblayout from "./weblayout";
import EditMe from "./mutation/editMe";
import CreateExpense from "./mutation/createExpense";
import CreateTag from "./mutation/createTag";
import MyTags from "./query/getMyTags";
import Home from "./home";
import MyExpense from "./query/getMyExpense";
import Chart from "./chart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Weblayout />}>
          <Route path="/me" element={<Me />} />
          <Route path="/editme/:id" element={<EditMe />} />
          <Route path="/createExpense" element={<CreateExpense />} />
          <Route path="/createTag" element={<CreateTag />} />
          <Route path="/myTags" element={<MyTags />} />
          <Route path="/myExpenses" element={<MyExpense />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chart" element={<Chart />} />
        </Route>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <h1>404 ERROR</h1>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
