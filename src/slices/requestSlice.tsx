import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestService } from "../_services/request.service";

interface UserProfile {
  firstName: string;
  lastName: string;
}

interface loginForm {
  email: string;
  password: string;
}

export const fetchLogin = createAsyncThunk(
  "request/fetchLogin",
  async (formData: loginForm, thunkAPI) => {
    const response = await requestService.login(formData);
    return response.data.body.token;
  }
);

// D'abord, créer le thunk
export const fetchGetUser = createAsyncThunk(
  "request/fetchGetUser",
  // pas de premier argument , utilisé underscore(-, )
  async (_, thunkAPI) => {
    try {
      const response = await requestService.getUser();
      console.log(response);

      let firstName = response.data.body.firstName;
      let lastName = response.data.body.lastName;

      // Feeds the store userInfo
      thunkAPI.dispatch({
        type: "userInfo/setFirstName",
        payload: firstName,
      });
      thunkAPI.dispatch({
        type: "userInfo/setLastName",
        payload: lastName,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error get user data");
    }
  }
);

interface updateForm {
  firstName: string;
  lastName: string;
}
export const fetchUpdateUser = createAsyncThunk(
  "request/fetchUpdateUser",
  async (formData: updateForm, thunkAPI) => {
    try {
      if (!formData.firstName || !formData.firstName) {
        throw new Error("The fiels is empty");
      }
      const response = await requestService.updateUser(formData);

      let firstName = response.data.body.firstName;
      let lastName = response.data.body.lastName;

      // Update the store userInfo
      thunkAPI.dispatch({
        type: "userInfo/setFirstName",
        payload: firstName,
      });
      thunkAPI.dispatch({
        type: "userInfo/setLastName",
        payload: lastName,
      });
      //return response.data;
    } catch (error) {
      throw new Error("Error update user data");
    }
  }
);

interface UserState {
  data: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  isLoading: false,
  error: null,
};

// Ensuite, gérez les actions dans vos réducteurs :
const requestSlice = createSlice<UserState, any>({
  name: "request",
  initialState,
  reducers: {
    // logique standard des réducteurs, avec des types d'action auto-générés par réducteur
  },
  extraReducers: (builder) => {
    const asyncAction = (actionCreator: {
      pending: any;
      fulfilled: any;
      rejected: any;
    }) => {
      //Ajouter des reducers pour des types d'actions supplémentaires ici, et gérer l'état de chargement si nécessaire
      builder
        //la promesse commence à etre résolue => isLoadind passe à true
        .addCase(actionCreator.pending, (state, action) => {
          state.isLoading = true;
        })
        //la promesse est résolue => on peu passer isLoading a false
        .addCase(actionCreator.fulfilled, (state, action) => {
          state.isLoading = false;
        })
        //la promesse et rejeté => on peu passer isLoading à false et on stock le message d'érreur dans le state
        .addCase(actionCreator.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message as string;
        });
    };

    [fetchLogin, fetchGetUser, fetchUpdateUser].forEach(asyncAction);
  },
});

export default requestSlice.reducer;
