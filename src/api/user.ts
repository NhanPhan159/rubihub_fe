import { UserDetails } from "../types";
import { axiosClient } from "../utils";

export const fetchCurrentUser = async () => {
  const response = await axiosClient.get<UserDetails>("/users/profile");
  return response.data;
};
export const updateUserProfile = async (body: Partial<UserDetails>) => {
  const response = await axiosClient.put("/users/profile",body)
  return response.data
}
