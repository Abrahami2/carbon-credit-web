import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosBaseUrl, SetAuthToken } from '../../../config/axios-configuration';

import { ENDPOINTS } from '../../../utils/constants';

const axios = AxiosBaseUrl();

const initialState = {
  token: null,
  user: null,
  loading: false,
  errMessage: null,
  success: false
};

export const SignIn = createAsyncThunk(
  ENDPOINTS.AUTH.SIGN_IN,
  async ({
    email,
    password
  }, {
    rejectWithValue
  }) => {
    try {
      const response = await axios.post(ENDPOINTS.AUTH.SIGN_IN, {
        email,
        password
      });
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data,
          status: err.response.status
        });
      }
      return rejectWithValue({
        err: {
          error: 'Network Error'
        }
      });
    }
  }
);

export const SignUp = createAsyncThunk(
  ENDPOINTS.AUTH.SIGN_UP,
  async ({
    name,
    email,
    password,
    userRole
  }, {
    rejectWithValue
  }) => {
    try {
      const response = await axios.post(ENDPOINTS.AUTH.SIGN_UP, {
        name,
        email,
        password,
        userRole
      });
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue({
          err: err.response.data,
          status: err.response.status
        });
      }
      return rejectWithValue({
        err: {
          error: 'Network Error'
        }
      });
    }
  }
);

const auth = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    SetAuthState(state, { payload: { field, value } }) {
      state[field] = value;
    },
    Logout: () => ({
      token: null,
      user: null
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignIn.pending, (state) => ({
        ...state,
        loading: true,
        success: false
      }))
      .addCase(SignIn.fulfilled, (state, action) => {
        SetAuthToken(action.payload.token);
        return {
          ...state,
          success: true,
          loading: false,
          token: action.payload.token,
          user: action.payload.user
        };
      })
      .addCase(SignIn.rejected, (state, action) => ({
        ...state,
        errMessage: action.payload.err.error || action.payload.err.message || 'Your Login Credentials Could Not Be Verified. Please Try Again.',
        success: false,
        loading: false
      }));
    builder
      .addCase(SignUp.pending, (state) => ({
        ...state,
        loading: true,
        success: false
      }))
      .addCase(SignUp.fulfilled, (state) => ({
        ...state,
        success: true,
        loading: false
      }))
      .addCase(SignUp.rejected, (state, action) => ({
        ...state,
        errMessage: action.payload.err.error?.details[0].message || action.payload?.err?.errorMessage,
        success: false,
        loading: false
      }));
  }
});

export const {
  SetAuthState,
  Logout
} = auth.actions;

export default auth.reducer;
