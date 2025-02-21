import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../stores/api";

export const addAddress = createAsyncThunk(
    'address/addAddress',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/user/address/add-address', userInput);
            if (response?.data?.status_code === 201) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue('Something went wrong.');
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)
export const getLatLong = createAsyncThunk(
    'address/getLatLong',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post("user/address/get-lat-lng", userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue('Something went wrong.');
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

export const getAddress = createAsyncThunk(
    'address/getAddress',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post("/user/address/get-user-addresses", userInput);
            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                if (response?.data?.errors) {
                    return rejectWithValue(response.data.errors);
                } else {
                    return rejectWithValue('Something went wrong.');
                }
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)
const initialState = {
    loading: false,
    error: false,
    addressMsg: "",
    location: [],
    message: "",
    userAddress: []
}
const AddAddressSlice = createSlice({
    name: 'addressAdds',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addAddress.pending, (state) => {
            state.loading = true
        })
            .addCase(addAddress.fulfilled, (state, { payload }) => {
                state.loading = false
                state.addressMsg = payload
                state.error = false
            })
            .addCase(addAddress.rejected, (state, { payload }) => {
                state.loading = false;
                state.addressMsg =
                    payload.payload !== undefined && payload.payload.message
                        ? payload.payload.message
                        : 'Something went wrong. Try again later.';
            })
            .addCase(getLatLong.pending, (state) => {
                state.loading = true
            })
            .addCase(getLatLong.fulfilled, (state, { payload }) => {
                state.loading = false
                state.location = payload
                state.error = false
            })
            .addCase(getLatLong.rejected, (state, { payload }) => {
                state.loading = false;
                state.message =
                    payload.payload !== undefined && payload.payload.message
                        ? payload.payload.message
                        : 'Something went wrong. Try again later.';
            })
            .addCase(getAddress.pending, (state) => {
                state.loading = true
            })
            .addCase(getAddress.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userAddress = payload
                state.error = false

            })
            .addCase(getAddress.rejected, (state, { payload }) => {
                state.loading = false;
                state.message =
                    payload.payload !== undefined && payload.payload.message
                        ? payload.payload.message
                        : 'Something went wrong. Try again later.';
            })
    }
})
export default AddAddressSlice.reducer;