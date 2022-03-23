import { useMutation, useQuery } from "react-query";
import api from "../../core/api";
import { getAuthToken } from "../../helpers/auth";

export const useCreateEmergencyOrder = () => {
  return useMutation((payload: any) =>
    api.post("/emergency-orders", payload, {
      headers: {
        authorization: getAuthToken() || "",
      },
    })
  );
};

export const useFinishEmergencyOrder = (orderId: string) => {
  return useMutation((payload: any) =>
    api.post(`/emergency-orders/${orderId}/finish`, payload, {
      headers: {
        authorization: getAuthToken() || "",
      },
    })
  );
};

export const useDoctors = () => {
  return useQuery("getDoctors", async () => {
    const { data } = await api.get("/doctors", {
      headers: {
        authorization: getAuthToken() || "",
      },
    });
    return data;
  });
};
