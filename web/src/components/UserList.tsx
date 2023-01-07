import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { countryCode } from "../utils/countryCode";
import DeleteModal from "./DeleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

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
  const [orderBy, setOrderBy] = useState("nik");
  const [orderAsc, setorderAsc] = useState(true);

  useEffect(() => {
    const timeOut = setTimeout(
      () => getUsers(searchNik, searchName, page, limit, orderBy, orderAsc),
      200
    );
    return () => clearTimeout(timeOut);
  }, [searchName, searchNik, page, limit, orderBy, orderAsc]);

  const getUsers = async (
    searchNik: string,
    searchName: string,
    page: number,
    limit: number,
    orderBy: string,
    orderAsc: boolean
  ) => {
    const response = await axios.get(
      `http://localhost:4000/search?nik=${searchNik}&name=${searchName}&page=${page}&limit=${limit}&order=${orderBy}&asc=${orderAsc}`
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
      getUsers(searchNik, searchName, page, limit, orderBy, orderAsc);
      setConfirmDelete({ show: false, fullName: "", nik: 0 });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = async (nextOrderBy: string) => {
    orderBy === nextOrderBy ? setorderAsc(!orderAsc) : setorderAsc(true);
    setOrderBy(nextOrderBy);
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
        <div className="column mt-auto">
          {false && (
            <button
              className="button is-info"
              onClick={() =>
                getUsers(searchNik, searchName, page, limit, orderBy, orderAsc)
              }
            >
              Search
            </button>
          )}
        </div>
        <div className="column mt-auto has-text-right">
          <Link to={`add`} className="button is-success">
            Add new
          </Link>
        </div>
      </div>
      <table className="table is-stripped is-fullwidth">
        <thead>
          <tr>
            {/* <th>No</th> */}
            <th>
              NIK
              <button
                className="button is-small is-ghost"
                onClick={() => handleSort("nik")}
              >
                {orderBy !== "nik" && <FontAwesomeIcon icon={faMinus} />}
                {orderBy === "nik" &&
                  (orderAsc ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  ))}
              </button>
            </th>
            <th>
              Nama Lengkap
              <button
                className="button is-small is-ghost"
                onClick={() => handleSort("fullName")}
              >
                {orderBy !== "fullName" && <FontAwesomeIcon icon={faMinus} />}
                {orderBy === "fullName" &&
                  (orderAsc ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  ))}
              </button>
            </th>
            <th>Umur</th>
            <th>
              Tanggal Lahir
              <button
                className="button is-small is-ghost"
                onClick={() => handleSort("bornDate")}
              >
                {orderBy !== "bornDate" && <FontAwesomeIcon icon={faMinus} />}
                {orderBy === "bornDate" &&
                  (orderAsc ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  ))}
              </button>
            </th>
            <th>
              Jenis Kelamin
              <button
                className="button is-small is-ghost"
                onClick={() => handleSort("gender")}
              >
                {orderBy !== "gender" && <FontAwesomeIcon icon={faMinus} />}
                {orderBy === "gender" &&
                  (orderAsc ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  ))}
              </button>
            </th>
            <th>
              Alamat
              <button
                className="button is-small is-ghost"
                onClick={() => handleSort("address")}
              >
                {orderBy !== "address" && <FontAwesomeIcon icon={faMinus} />}
                {orderBy === "address" &&
                  (orderAsc ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  ))}
              </button>
            </th>
            <th>
              Negara
              <button
                className="button is-small is-ghost"
                onClick={() => handleSort("nationality")}
              >
                {orderBy !== "nationality" && (
                  <FontAwesomeIcon icon={faMinus} />
                )}
                {orderBy === "nationality" &&
                  (orderAsc ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  ))}
              </button>
            </th>
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
                    ? countryCode[user.nationality as keyof typeof countryCode]
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
      <div className="columns is-centered">
        <div className="column px-0 has-text-right">
          <button
            className="button"
            disabled={page < 2}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
        </div>
        <div className="column px-0 has-text-right">
          {page > 2 && (
            <button className="button is-ghost" onClick={() => setPage(1)}>
              1
            </button>
          )}
          {page > 3 && <span className="pagination-ellipsis">&hellip;</span>}
          {page > 1 && (
            <button
              className="button is-ghost"
              onClick={() => setPage(page - 1)}
            >
              {page - 1}
            </button>
          )}
        </div>
        <div className="column px-0 is-narrow">
          <button className="button is-disabled">{page}</button>
        </div>
        <div className="column px-0">
          {page < Math.ceil(dataCount / limit) - 1 && (
            <button
              className="button is-ghost"
              onClick={() => setPage(page + 1)}
            >
              {page + 1}
            </button>
          )}
          {page < Math.ceil(dataCount / limit) - 2 && (
            <span className="pagination-ellipsis">&hellip;</span>
          )}
          {page < Math.ceil(dataCount / limit) && (
            <button
              className="button is-ghost"
              onClick={() => setPage(Math.ceil(dataCount / limit))}
            >
              {Math.ceil(dataCount / limit)}
            </button>
          )}
        </div>
        <div className="column px-0">
          <button
            className="button"
            disabled={page > Math.ceil(dataCount / limit) - 1}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <div className="container">
        {confirmDelete.show && (
          <DeleteModal
            handleDeleteFalse={handleDeleteFalse}
            handleDeleteTrue={handleDeleteTrue}
            fullName={confirmDelete.fullName}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
