import { RootState } from "..";
import { UserState } from "../../types";


export const selectUser = (state: RootState) : UserState => state.user;

export const selectError = (state: RootState) : string | null => state.user.error;

export const selectLoading = (state: RootState) : boolean | null => state.user.loading;
