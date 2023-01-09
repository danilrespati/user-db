import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { countryCode } from "../utils/countryCode";

const AddUser = () => {
  const [nik, setNik] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [address, setAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const navigate = useNavigate();

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const saveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/users", {
        nik,
        fullName,
        gender,
        bornDate,
        address,
        nationality,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveUser}>
          <div className="field">
            <label className="label">NIK</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                placeholder="NIK"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Nama Lengkap</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nama Lengkap"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Jenis Kelamin</label>
            <div className="control">
              <label className="radio">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  className="mx-2"
                  onChange={radioHandler}
                  checked={gender === "Male"}
                />
                Male
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  className="mx-2"
                  onChange={radioHandler}
                  checked={gender === "Female"}
                />
                Female
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label">Tanggal Lahir</label>
            <div className="control">
              <input
                type="date"
                className="input"
                value={bornDate}
                onChange={(e) => setBornDate(e.target.value)}
                max={new Date().toISOString().slice(0, 10)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Alamat</label>
            <div className="control">
              <textarea
                className="textarea"
                rows={4}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Negara</label>
            <div className="control">
              <select
                className="select is-fullwidth"
                name="nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              >
                <option value="">--Select One--</option>
                {Object.keys(countryCode).map((key) => {
                  const content = countryCode[key as keyof typeof countryCode];
                  return <option value={key}>{content}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Save
            </button>
            <Link className="button is-info ml-5" to={`/`}>
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
