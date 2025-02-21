import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../stores/api';
import errorHandler from '../stores/errorHandler';

// Async thunk for fetching user list
export const getMegamenuList = createAsyncThunk(
    'megamenu/getMegamenuList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/user/mega-menu');
            if (response?.data?.status_code === 200) {
                return { data: response.data, status: response.status };
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            let errors = errorHandler(err);
            return rejectWithValue(errors);
        }
    }
);

// Mega Menu slice
const MenuSlice = createSlice({
    name: 'megamenu',
    initialState: {
        data: [], // To store the user list data
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMegamenuList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMegamenuList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload?.data; // Store API response here
            })
            .addCase(getMegamenuList.rejected, (state, response) => {
                state.loading = false;
                state.error = true;
                state.message =
                    response.payload !== undefined && response.payload.message
                        ? response.payload.message
                        : 'Something went wrong. Try again later.';
            });
    },
});

// Export the reducer
export default MenuSlice.reducer;
