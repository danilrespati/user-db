import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";

interface user {
  nik: number;
  fullName: string;
  gender?: string;
  bornDate?: string;
  address?: string;
  nationality?: string;
}

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    fullName: "",
    nik: 0,
  });
  const [searchNik, setSearchNik] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    getUsers(searchNik, searchName);
  }, [searchName, searchNik]);

  const getUsers = async (searchNik: String, searchName: String) => {
    const response = await axios.get(
      `http://localhost:4000/search?nik=${searchNik}&name=${searchName}`
    );
    setUsers(response.data);
  };

  const handleDelete = (fullName: string, nik: number) => {
    setConfirmDelete({ show: true, fullName: fullName, nik: nik });
  };

  const handleDeleteFalse = () => {
    setConfirmDelete({ show: false, fullName: "", nik: 0 });
  };

  const handleDeleteTrue = async () => {
    try {
      await axios.delete(`http://localhost:4000/users/${confirmDelete.nik}`);
      getUsers(searchNik, searchName);
      setConfirmDelete({ show: false, fullName: "", nik: 0 });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-5 mx-5">
      <div className="columns">
        <div className="column is-two-fifths">
          <div className="field">
            <label className="label is-hidden">NIK</label>
            <input
              type="search"
              className="input"
              placeholder="NIK"
              value={searchNik}
              onChange={(e) => setSearchNik(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="label is-hidden">Name</label>
            <input
              type="search"
              className="input"
              placeholder="Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
        </div>
        <div className="column is-narrow mt-auto">
          <button
            className="button is-info"
            onClick={() => getUsers(searchNik, searchName)}
          >
            Search
          </button>
        </div>
        <div className="column is-narrow mt-auto">
          <Link to={`add`} className="button is-success">
            Add new
          </Link>
        </div>
      </div>
      <div className="">
        <table className="table is-stripped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>NIK</th>
              <th>Nama Lengkap</th>
              <th>Umur</th>
              <th>Tanggal Lahir</th>
              <th>Jenis Kelamin</th>
              <th>Alamat</th>
              <th>Negara</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: user, index) => {
              let dob, age;
              if (user.bornDate) {
                dob = Date.parse(user.bornDate);
                const ageDiff = new Date(Date.now() - dob);
                age = Math.abs(ageDiff.getUTCFullYear() - 1970);
                dob = new Date(dob).toLocaleDateString("id", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });
              } else {
                age = "N/A";
                dob = "N/A";
              }
              return (
                <tr key={user.nik}>
                  <td>{index + 1}</td>
                  <td>{user.nik}</td>
                  <td>{user.fullName}</td>
                  <td>{age}</td>
                  <td>{dob}</td>
                  <td>{user.gender}</td>
                  <td>{user.address}</td>
                  <td>{user.nationality}</td>
                  <td>
                    <Link
                      to={`detail/${user.nik}`}
                      className="button is-small is-info"
                    >
                      Detail
                    </Link>
                    <Link
                      to={`edit/${user.nik}`}
                      className="button is-small is-warning"
                    >
                      Edit
                    </Link>
                    <button
                      className="button is-small is-danger"
                      onClick={() => handleDelete(user.fullName, user.nik)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {confirmDelete.show && (
        <DeleteModal
          handleDeleteFalse={handleDeleteFalse}
          handleDeleteTrue={handleDeleteTrue}
          fullName={confirmDelete.fullName}
        />
      )}
    </div>
  );
};

export default UserList;
