import { createSlice } from '@reduxjs/toolkit';

/*
Pass alerts formed like this:
{
  title: "Your title",
  message: "Your message",
  variant: "danger" || "success" || ...
}
*/

export const alertSlice = createSlice({
  name: 'alert',
  initialState: [],
  reducers: {
    addAlert: (state, action) => {
      console.log('addAlert()');
      return [...state, {
        title: action.payload.title,
        message: action.payload.message,
        variant: action.payload.variant,
      }];
    },
    closeAlert: (state, action) => {
      let newState = [...state];
      newState.splice(action.payload.index, 1);
      return newState;
    }
  }
});

// Action creators are generated for each case reducer function
// export const {} = cardSlice.actions;

export const selectAlerts = (state) => state.alert;
export const { addAlert, closeAlert } = alertSlice.actions;
export default alertSlice.reducer;
