import { StateCreator } from "zustand";

type State = {
  fixedExpenses: number;
  monthlyIncome: number;
  nonEssentialExpenses: number;
};

type Action = {
  setFixedExpenses: (value: number) => void;
  setMonthlyIncome: (value: number) => void;
  setNonEssentialExpenses: (value: number) => void;
};

export type UserInfoType = State & Action;

const createUserInfoSlice: StateCreator<UserInfoType> = (set) => ({
  // Variables
  fixedExpenses: 0,
  monthlyIncome: 0,
  nonEssentialExpenses: 0,

  // Actions
  setFixedExpenses: (value) => set({ fixedExpenses: value }),
  setMonthlyIncome: (value) => set({ monthlyIncome: value }),
  setNonEssentialExpenses: (value) => set({ nonEssentialExpenses: value }),
});

export default createUserInfoSlice;
