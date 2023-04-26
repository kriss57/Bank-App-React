import React, { useEffect, useState } from "react";
import { requestService } from "../../_services/request.service";

interface UserProfile {
  firstName: string;
  lastName: string;
}

const HeaderProfil = () => {
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
  const [toggle, setToggle] = useState(true);

  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
  }>({ firstName: "", lastName: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestService.getUser();

        setUserInfo(response.data.body);
        //setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const showEditForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setToggle(!toggle);
    console.log(toggle);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await requestService.updateUser(formData);
      console.log(response.data);
      //return response.data;
    } catch (error) {
      throw new Error("Error update user data");
    }
  };

  return (
    <>
      {toggle ? (
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userInfo && userInfo?.firstName + " " + userInfo?.lastName}
          </h1>
          <button onClick={showEditForm} className="edit-button">
            Edit Name
          </button>
        </div>
      ) : (
        <div className="header">
          <h1>Welcome back</h1>
          <form onSubmit={handleSubmit} className="edit-form-container">
            <div className="input-container">
              <input
                type="text"
                name="firstName"
                placeholder={userInfo?.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder={userInfo?.lastName}
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
          <p>{formData.firstName}</p>
          <p>{formData.lastName}</p>
        </div>
      )}
    </>
  );
};

export default HeaderProfil;
