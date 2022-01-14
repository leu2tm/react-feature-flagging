import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSchema } from "./schemaAPI";
import { set, mapValues } from "lodash";

const initialState = {
  schema: {},
};

export const loadSchemaAsync = createAsyncThunk("feature/fetchSchema", async () => {
  const response = await fetchSchema();
  return response.data;
});

const deactivateAllChildFeatures = (features) =>
  features
    ? mapValues(features, (f) => ({
        ...f,
        features: deactivateAllChildFeatures(f.features),
        is_active: false,
      }))
    : undefined;

export const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    updateFeatureSetting: (state, action) => {
      const { key, ...newState } = action.payload;

      if (!newState.is_active && newState.features) newState.features = deactivateAllChildFeatures(newState.features);

      state.schema = set(state.schema, action.payload.key, newState);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadSchemaAsync.fulfilled, (state, action) => {
      state.schema = { ...state.schema, ...action.payload };
    });
  },
});

export const { updateFeatureSetting } = featureSlice.actions;

export const selectFeature = (state) => state.feature;

export default featureSlice.reducer;
