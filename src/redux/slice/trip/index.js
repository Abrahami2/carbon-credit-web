import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosBaseUrl, SetAuthToken } from '../../../config/axios-configuration';

import { ENDPOINTS } from '../../../utils/constants';

const axios = AxiosBaseUrl();

const initialState = {
  trips: [],
  message: null,
  loading: false,
  errMessage: null,
  success: false
};

export const AddNewTrip = createAsyncThunk(
  ENDPOINTS.TRIPS.ADD_TRIP,
  async ({
    userId,
    date,
    mode,
    distance,
    credits,
    proof
  }, {
    rejectWithValue
  }) => {

    console.log({ userId,
      date,
      mode,
      distance,
      credits,
      proof });
    try {
      const response = await axios.post(ENDPOINTS.TRIPS.ADD_TRIP, {
        userId,
        date,
        mode,
        distance,
        credits,
        proof
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

export const GetAllTrips = createAsyncThunk(
  ENDPOINTS.TRIPS.GET_TRIPS,
  async ({
    userId
  }, {
    rejectWithValue
  }) => {
    try {
      const response = await axios.post(ENDPOINTS.TRIPS.GET_TRIPS, {
        userId
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

const trip = createSlice({
  name: 'tripReducer',
  initialState,
  reducers: {
    SetTripState(state, { payload: { field, value } }) {
      state[field] = value;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddNewTrip.pending, (state) => ({
        ...state,
        loading: true,
        success: false
      }))
      .addCase(AddNewTrip.fulfilled, (state, action) => {
        return {
          ...state,
          success: true,
          loading: false,
          message: action.payload.message
        };
      })
      .addCase(AddNewTrip.rejected, (state, action) => ({
        ...state,
        errMessage: action.payload.err.error || action.payload.err.message || 'Unknown Error',
        success: false,
        loading: false
      }));
    builder
      .addCase(GetAllTrips.pending, (state) => ({
        ...state,
        loading: true,
        success: false
      }))
      .addCase(GetAllTrips.fulfilled, (state, action) => ({
        ...state,
        success: true,
        loading: false,
        trips: action.payload.trips
      }))
      .addCase(GetAllTrips.rejected, (state, action) => ({
        ...state,
        errMessage: action.payload.err.error?.details[0].message || action.payload?.err?.errorMessage,
        success: false,
        loading: false
      }));
  }
});

export const {
  SetTripState
} = trip.actions;

export default trip.reducer;
