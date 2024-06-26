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


const changeAddressSlice = createSlice({
  name: "address",
  initialState: {
    data: {},
    fetchLoading: false,
    fetchError: null,
    updateLoading: false,
    updateError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
  
      .addCase(Change_Address.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(Change_Address.fulfilled, (state, action) => {
        state.updateLoading = false;
      })
      .addCase(Change_Address.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export default changeAddressSlice.reducer;
