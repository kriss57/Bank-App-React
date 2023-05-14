import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchGetUser, fetchUpdateUser } from "../../slices/requestSlice";

import "./headerProfil.css";

const HeaderProfil = () => {
  const [toggle, setToggle] = useState(true);
  // init dispatch
  const dispatch: AppDispatch = useDispatch();
  // get data store
  const userData = useSelector((state: RootState) => state.userInfo); // Attention requet a chaque maj du store A voir !!!

  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
  }>({ firstName: "", lastName: "" });

  useEffect(() => {
    dispatch(fetchGetUser());
    console.log("useEffect");
  }, [dispatch]);

  const showEditForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setToggle(!toggle);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      alert("Please fill in all required fields !");
      return;
    }
    dispatch(fetchUpdateUser(formData));
  };

  return (
    <>
      {toggle ? (
        <div className="header">
          <h1 style={{ color: "black", paddingTop: "20px" }}>
            Welcome back
            <br />
            {userData && userData?.firstName + " " + userData?.lastName}
          </h1>
          <button onClick={showEditForm} className="edit-button">
            Edit Name
          </button>
        </div>
      ) : (
        <div className="header">
          <h1 style={{ color: "black", padding: "20px", margin: "0" }}>
            Welcome back
          </h1>
          <form onSubmit={handleSubmit} className="edit-form-container">
            <div className="input-container">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                onChange={handleChange}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="save-button">
                Save
              </button>
              <button onClick={showEditForm} className="cancel-button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default HeaderProfil;
