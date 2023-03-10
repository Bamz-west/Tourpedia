import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createTour = createAsyncThunk("tour/createTour", async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
        const { data } = await api.createTour(updatedTourData);

        toast.success("Tour Added Successfully");

        navigate("/");

        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const getTours = createAsyncThunk("tour/getTours", async (page, { rejectWithValue }) => { // _, => if youre not getting any parameter from the ui component
    try {
        const { data } = await api.getTours(page);

        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const getTour = createAsyncThunk("tour/getTour", async ( id, { rejectWithValue }) => {
    try {
        const { data } = await api.getTour(id);

        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const getToursByUser = createAsyncThunk("tour/getToursByUser", async ( userId, { rejectWithValue }) => {
    try {
        const { data } = await api.getToursByUser(userId);

        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const deleteTour = createAsyncThunk("tour/deleteTour", async ({ id, toast }, { rejectWithValue }) => {
    try {
        const { data } = await api.deleteTour(id);

        toast.success("Tour Deleted Successfully");

        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const updateTour = createAsyncThunk("tour/updateTour", async ({ updatedTourData, id, toast, navigate }, { rejectWithValue }) => {
    try {
        const { data } = await api.updateTour(updatedTourData, id);

        toast.success("Tour Updated Successfully");

        navigate("/");

        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const searchTours = createAsyncThunk("tour/searchTours", async (searchQuery, { rejectWithValue }) => {
    try {
        const { data } = await api.getToursBySearch(searchQuery);

        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const getToursByTag = createAsyncThunk("tour/getToursByTag", async (tag, { rejectWithValue }) => {
    try {
        const { data } = await api.getTagTours(tag);

        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const getRelatedTours = createAsyncThunk("tour/getRelatedTours", async (tags, { rejectWithValue }) => {
    try {
        const { data } = await api.getRelatedTours(tags);

        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const likeTour = createAsyncThunk("tour/likeTour", async ({ _id }, { rejectWithValue }) => {
    try {
        const { data } = await api.likeTour(_id);

        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


const tourSlice = createSlice({
    name: "tour",
    initialState: {
        tour: {},
        tours: [],
        userTours: [],
        tagTours: [],
        relatedTours: [],
        currentPage: 1,
        numberOfPages: null,
        error: false,
        errorMessage: "",
        loading: false
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: {
        [createTour.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [createTour.fulfilled]: (state, action) => {
            state.loading = false;
            state.tours = [action.payload];
        },
        [createTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload.message;
        },


        [getTours.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [getTours.fulfilled]: (state, action) => {
            state.loading = false;
            state.tours = action.payload.data;
            state.numberOfPages = action.payload.numberOfPages;
            state.currentPage = action.payload.currentPage;
        },
        [getTours.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload.message;
        },


        [getTour.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [getTour.fulfilled]: (state, action) => {
            state.loading = false;
            state.tour = action.payload;
        },
        [getTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload.message;
        },


        [getToursByUser.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [getToursByUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userTours = action.payload;
        },
        [getToursByUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload.message;
        },


        [deleteTour.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [deleteTour.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("action", action);
            const { arg: {id} } = action.meta;
            if(id) {
                state.userTours = state.userTours.filter((tour) => tour._id !== id);
                state.tours = state.tours.filter((tour) => tour._id !== id);
            }
        },
        [deleteTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload.message;
        },
        
        
        [updateTour.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [updateTour.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log("action", action);
            const { arg: {id} } = action.meta;
            if(id) {
                state.userTours = state.userTours.map((tour) => 
                    tour._id === id ? action.payload : tour
                );
                state.tours = state.tours.map((tour) => 
                    tour._id === id ? action.payload : tour
                );
            }
        },
        [updateTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload.message;
        },
        
        
        [likeTour.pending]: (state, action) => {},
        [likeTour.fulfilled]: (state, action) => {
            state.loading = false;
            const { arg: {_id} } = action.meta;
            if(_id) {
                state.tours = state.tours.map((tour) => 
                    tour._id === _id ? action.payload : tour
                );
            }
        },
        [likeTour.rejected]: (state, action) => {
            state.error = true;
            state.errorMessage = action.payload.message;
        },


        [searchTours.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [searchTours.fulfilled]: (state, action) => {
            state.loading = false;
            state.tours = action.payload;
        },
        [searchTours.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload.message;
        },
        
        
        [getToursByTag.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [getToursByTag.fulfilled]: (state, action) => {
            state.loading = false;
            state.tagTours = action.payload;
        },
        [getToursByTag.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload.message;
        },
        
        
        [getRelatedTours.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [getRelatedTours.fulfilled]: (state, action) => {
            state.loading = false;
            state.relatedTours = action.payload;
        },
        [getRelatedTours.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload.message;
        },
    }
});

export  const { setCurrentPage } = tourSlice.actions;

export default tourSlice.reducer;