import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../stores/api';
import errorHandler from '../stores/errorHandler';

// Async thunk for fetching user list
export const getCategoryAttributeDetail = createAsyncThunk(
    'categoryDetails/getCategoryAttributeDetail',
    async (categoryId, { rejectWithValue }) => {
        // console.log("Check payload of categoryId",categoryId);
        try {
            const response = await api.post('/user/product/category-attributes-details', categoryId);

            //  console.log("response========",response)

            if (response?.data?.status_code === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


// Category slice
const categoryDetailSlice = createSlice({
    name: 'categoryDetails',
    initialState: {
        loading: false,
        error: null,
        message: "",
        categoryAttributeData: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryAttributeDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategoryAttributeDetail.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.categoryAttributeData = payload;
                state.message = payload?.message;
            })
            .addCase(getCategoryAttributeDetail.rejected, (state, response) => {
                state.loading = false;
                state.error = true;
                state.message =
                    response?.payload !== undefined && response?.payload.message
                        ? response?.payload.message
                        : 'Something went wrong. Try again later.';
            });
    },
});

// Export the reducer
export default categoryDetailSlice.reducer;

