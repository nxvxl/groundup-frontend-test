import { createContext } from "react";
import { Alert } from "../types";

export const AlertContext = createContext({});

interface AlertState {
  alerts: Alert[];
  currentAlert: string;
}

export const initialState: AlertState = {
  alerts: [],
  currentAlert: "",
};

export const actions = {
  GET_ALERTS: "GET_ALERTS",
  SELECT_ALERT: "SELECT_ALERT",
};

export const reducer = (state: AlertState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case actions.GET_ALERTS:
      return {
        ...state,
        alerts: action.payload
      }
    case actions.SELECT_ALERT:
      return {
        ...state,
        currentAlert: action.payload
      }
    default:
      return state
  }
};