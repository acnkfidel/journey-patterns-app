import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { JourneyKey } from '../types/journey';

interface JourneyState {
  activeJourney: JourneyKey | null;
}

const initialState: JourneyState = {
  activeJourney: null,
};

export const journeySlice = createSlice({
  name: 'journey',
  initialState,
  reducers: {
    setActiveJourney: (state, action: PayloadAction<JourneyKey | null>) => {
      state.activeJourney = action.payload;
    },
  },
});

export const { setActiveJourney } = journeySlice.actions;
export default journeySlice.reducer;
