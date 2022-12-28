import React from "react";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditUser from "./components/EditUser";
import DetailUser from "./components/DetailUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="add" element={<AddUser />} />
        <Route path="edit/:nik" element={<EditUser />} />
        <Route path="detail/:nik" element={<DetailUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
