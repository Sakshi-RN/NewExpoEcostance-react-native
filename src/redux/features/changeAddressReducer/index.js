import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../../../config";
import { Api } from "../../apiList";

export const Change_Address = createAsyncThunk(
  "address/ChangeAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      const response = await axios.patch(
        `${Config.baseUrl}/${Api.updateAddress}`,
        addressData,
        {
          headers: {
            ...Config.appHeaders,
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  data: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  },
  fetchLoading: false,
  fetchError: null,
  updateLoading: false,
  updateError: null,
};

const changeAddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    Set_Address_Field(state, action) {
      const { field, value } = action.payload;
      state.data[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Change_Address.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(Change_Address.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.data = action.payload;
      })
      .addCase(Change_Address.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export const { Set_Address_Field } = changeAddressSlice.actions;

export default changeAddressSlice.reducer;
