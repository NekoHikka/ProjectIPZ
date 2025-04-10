import { customFetch } from "../utils";

export const getProfile = (token) => {
  return customFetch.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateLocation = (location, token) => {
  return customFetch.patch(
    "/profile/",
    { location },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
