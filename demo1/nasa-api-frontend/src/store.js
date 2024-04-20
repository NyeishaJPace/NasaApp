import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/nasa';

const useStore = create((set) => ({
  data: [],
  loading: false,
  error: null,
  fetchPictureOfTheDay: async (date) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${BASE_URL}/apod?date=${date}`);
      set({ data: [response.data], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  fetchImagesByDateRange: async (fromDate, toDate) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(
        `${BASE_URL}/apods?start_date=${fromDate}&end_date=${toDate}`
      );
      set({ data: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useStore;