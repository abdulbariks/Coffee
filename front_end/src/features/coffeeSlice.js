import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const showCoffees = createAsyncThunk(
  "showCoffees",
  async (args, { rejectWithValue }) => {
    const response = await fetch("http://localhost:5000/products");
    console.log(response);

    try {
      const result = await response.json();
      console.log(result);

      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addCoffee = createAsyncThunk(
  "addCoffee",
  async (data, { rejectWithValue }) => {
    const response = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCoffee = createAsyncThunk(
  "deleteCoffee",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    });

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const coffeeSlice = createSlice({
  name: "coffeeSlice",
  initialState: {
    coffee: {},
    coffees: [],
    loading: false,
    error: null,
  },
  reducers: {
    // changeStateTrue: (state) => {
    //   state.updateState = true;
    // },
    // changeStateFalse: (state) => {
    //   state.updateState = false;
    // },
    // clearResponse: (state) => {
    //   state.response = "";
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCoffee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCoffee.fulfilled, (state, action) => {
        state.loading = false;
        state.coffees = action.payload;
      })
      .addCase(addCoffee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(showCoffees.pending, (state) => {
        state.loading = true;
      })
      .addCase(showCoffees.fulfilled, (state, action) => {
        state.loading = false;
        state.coffees = action.payload;
      })
      .addCase(showCoffees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder.addCase(deleteCoffee.fulfilled, (state, action) => {
      state.coffees = state.coffees.filter(
        (item) => item._id !== action.payload
      );
      state.response = "delete";
    });

    // builder.addCase(modifiedEmployee.fulfilled, (state, action) => {
    //   const updateItem = action.payload;
    //   console.log(updateItem);
    //   const index = state.employeeList.findIndex(
    //     (item) => item._id === updateItem._id
    //   );
    //   if (index!==-1) {
    //     state.employeeList[index] = updateItem;
    //   }
    //   state.response = "update";
    // });
  },
});

export default coffeeSlice.reducer;
// export const { changeStateTrue, changeStateFalse, clearResponse } =
//   coffeeSlice.actions;

// export const coffeeSlice = createSlice({
//   name: "coffeeSlice",
//   initialState: {
//     coffee: {},
//     coffees: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: {
//     [addCoffee.pending]: (state) => {
//       state.loading = true;
//     },
//     [addCoffee.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.coffees = action.payload;
//     },
//     [addCoffee.rejected]: (state, action) => {
//       state.loading = false;
//       state.error = action.payload.message;
//     },
//     [showCoffees.pending]: (state) => {
//       state.loading = true;
//     },
//     [showCoffees.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.coffees = action.payload;
//     },
//     [showCoffees.rejected]: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     [deleteCoffee.pending]: (state) => {
//       state.loading = true;
//     },
//     [deleteCoffee.fulfilled]: (state, action) => {
//       state.loading = false;
//       const { _id } = action.payload;
//       if (_id) {
//         state.coffees = state.coffees.filter((coffee) => coffee._id !== _id);
//       }
//     },
//   },
// });

// export default coffeeSlice.reducer;
