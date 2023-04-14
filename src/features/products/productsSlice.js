import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, postProduct, updateProduct } from "./productsAPI";

const initialState = {
    products: [],
    isLoading: false,
    postSuccess: false,
    deleteSuccess: false,
    updateSuccess: false,
    isError: false,
    error: "",
}

export const getProducts = createAsyncThunk("products/getProduct", async () => {
    const products = fetchProducts();
    return products;
})

export const addProduct = createAsyncThunk("products/addProduct", async (data) => {
    const products = postProduct(data);
    return products;
})

export const removeProduct = createAsyncThunk("products/removeProduct", async (id, thunkAPI) => {
    const products = await deleteProduct(id);
    thunkAPI.dispatch(removeFromList(id));
    return products;
})

export const modifyProduct = createAsyncThunk("products/modifyProduct", async(productInfo) =>{
    const products = await updateProduct(productInfo);
    return products;
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        togglePostSuccess: (state) => {
            state.postSuccess = false;
        },
        toggleDeleteSuccess: (state) => {
            state.deleteSuccess = false;
        },
        toggleUpdateSuccess: (state) => {
            state.updateSuccess = false;
        },
        removeFromList: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })

            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
                state.postSuccess = false;
                state.isError = false;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.postSuccess = true;
                state.isLoading = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.postSuccess = false;
            })


            .addCase(removeProduct.pending, (state) => {
                state.isLoading = true;
                state.deleteSuccess = false;
                state.isError = false;
            })
            .addCase(removeProduct.fulfilled, (state) => {
                state.deleteSuccess = true;
                state.isLoading = false;
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.deleteSuccess = false;
            })

            .addCase(modifyProduct.pending, (state) => {
                state.isLoading = true;
                state.updateSuccess = false;
                state.isError = false;
            })
            .addCase(modifyProduct.fulfilled, (state) => {
                state.updateSuccess = true;
                state.isLoading = false;
            })
            .addCase(modifyProduct.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
                state.updateSuccess = false;
            })

    },
});

export const { togglePostSuccess, toggleDeleteSuccess, toggleUpdateSuccess, removeFromList } = productsSlice.actions;
export default productsSlice.reducer;