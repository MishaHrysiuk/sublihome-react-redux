import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeFilter: 4
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => { state.activeFilter = action.payload }
    }
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const {
    activeFilterChanged
} = actions;