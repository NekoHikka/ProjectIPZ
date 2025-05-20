import { customFetch } from "../utils";

export const getProfile = (token) => {
  return customFetch.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateLocation = (location, latitude, longitude, token) => {
  return customFetch.put(
    "/profile/location/",
    { location, latitude, longitude },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const updateProfileImage = (profileImage, token) => {
  const formData = new FormData();
  formData.append("profile_image", profileImage);

  return customFetch.put("/profile/", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
