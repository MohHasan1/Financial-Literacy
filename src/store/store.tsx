import { create } from "zustand";
import createUserInfoSlice, { UserInfoType } from "./slices/userInfoSlice";


const useStore = create<UserInfoType>()((...a) => ({
  ...createUserInfoSlice(...a),
}));

export default useStore;
