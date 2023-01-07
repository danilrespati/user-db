import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { countryCode } from "../utils/countryCode";
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
  const [dataCount, setdataCount] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    const timeOut = setTimeout(
      () => getUsers(searchNik, searchName, page, limit),
      500
    );
    return () => clearTimeout(timeOut);
  }, [searchName, searchNik, page, limit]);

  const getUsers = async (
    searchNik: string,
    searchName: string,
    page: number,
    limit: number
  ) => {
    const response = await axios.get(
      `http://localhost:4000/search?nik=${searchNik}&name=${searchName}&page=${page}&limit=${limit}`
    );
    setUsers(response.data[0]);
    setdataCount(response.data[1]);
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
      getUsers(searchNik, searchName, page, limit);
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
              onChange={(e) => {
                setSearchNik(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="field">
            <label className="label is-hidden">Name</label>
            <input
              type="search"
              className="input"
              placeholder="Name"
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
        <div className="column is-narrow mt-auto">
          <button
            className="button is-info"
            onClick={() => getUsers(searchNik, searchName, page, limit)}
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
              {/* <th>No</th> */}
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
                  {/* <td>{index + 1}</td> */}
                  <td>{user.nik}</td>
                  <td>{user.fullName}</td>
                  <td>{age}</td>
                  <td>{dob}</td>
                  <td>{user.gender || "N/A"}</td>
                  <td>{user.address || "N/A"}</td>
                  <td>
                    {user.nationality
                      ? countryCode[
                          user.nationality as keyof typeof countryCode
                        ]
                      : "N/A"}
                  </td>
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
        <div>
          <button
            className="button"
            disabled={page < 2}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <button className="button">{page}</button>

          <button
            className="button"
            disabled={page > Math.ceil(dataCount / limit) - 1}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
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
