import { useQuery } from "react-query";
import api from "../../core/api";
import { getAuthToken } from "../../helpers/auth";

export const useEmergencyOrders = () => {
  return useQuery("emergencyOrders", async () => {
    const { data } = await api.get("/emergency-orders", {
      headers: {
        authorization: getAuthToken() || "",
      },
    });
    return data;
  });
};
