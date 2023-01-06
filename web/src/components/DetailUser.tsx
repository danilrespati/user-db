import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { countryCode } from "../utils/countryCode";

const DetailUser = () => {
  const [nik, setNik] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [address, setAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    getUserByNik();
  });

  const getUserByNik = async () => {
    const response = await axios.get(
      `http://localhost:4000/users/${param.nik}`
    );
    setNik(response.data.nik);
    setFullName(response.data.fullName);
    setGender(response.data.gender);
    setBornDate(response.data.bornDate);
    setAddress(response.data.address);
    setNationality(
      countryCode[response.data.nationality as keyof typeof countryCode]
    );
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <div className="field">
            <label className="label">NIK</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nik}
                placeholder="NIK"
                readOnly
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
                placeholder="Nama Lengkap"
                readOnly
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
                  checked={gender === "Male"}
                  readOnly
                />
                Male
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  className="mx-2"
                  checked={gender === "Female"}
                  readOnly
                />
                Female
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label">Tanggal Lahir</label>
            <div className="control">
              <input type="date" className="input" value={bornDate} readOnly />
            </div>
          </div>
          <div className="field">
            <label className="label">Alamat</label>
            <div className="control">
              <textarea
                className="textarea"
                rows={4}
                value={address}
                readOnly
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Negara</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nationality}
                readOnly
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailUser;
