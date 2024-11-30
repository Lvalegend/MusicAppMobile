import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AccountData = {
  role: string;
  user_name: string;
  user_avatar: string;
  email: string;
  password: string;
};
interface AuthState {
  token: string | null;
  account: AccountData | null
}

const initialState: AuthState = {
  token: null,
  account: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setAccountUser: (state, action: PayloadAction<AccountData>) => {
      state.account = action.payload;
    },
    clearAccountUser: (state) => {
      state.account = null;
    },
  },
});

export const { setToken, clearToken, setAccountUser, clearAccountUser } = authSlice.actions;
export default authSlice.reducer;
