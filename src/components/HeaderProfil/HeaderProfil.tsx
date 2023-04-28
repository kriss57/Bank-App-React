import React, { useEffect, useState } from "react";
import { requestService } from "../../_services/request.service";
// import hooks redux from "react-redux"
import { useDispatch, useSelector } from "react-redux";

interface RootState {
  userInfo: {
    firstName: string;
    lastName: string;
  };
}

const HeaderProfil = () => {
  //const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
  const [toggle, setToggle] = useState(true);
  // init dispatch
  const dispatch = useDispatch();
  // get data store
  const userData = useSelector((state: RootState) => state.userInfo);
  console.log(userData);

  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
  }>({ firstName: "", lastName: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestService.getUser();
        console.log(response.data.body.firstName);

        // Feeds the store userInfo
        dispatch({
          type: "userInfo/setFirstName",
          payload: response?.data.body.firstName,
        });
        dispatch({
          type: "userInfo/setLastName",
          payload: response?.data.body.lastName,
        });
        //setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
    try {
      const response = await requestService.updateUser(formData);
      console.log(response.data);
      // Update the store userInfo
      dispatch({
        type: "userInfo/setFirstName",
        payload: response.data.body.firstName,
      });
      dispatch({
        type: "userInfo/setLastName",
        payload: response.data.body.lastName,
      });
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
            {userData && userData?.firstName + " " + userData?.lastName}
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
                placeholder={userData?.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder={userData?.lastName}
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
