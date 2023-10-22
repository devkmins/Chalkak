// Api
import client from "./config";

interface ChangePasswordHashedFormData {
  currentPassword: string;
  newPassword: string;
  newConfirmPassword: string;
}

interface CloseAccountHashedFormData {
  password: string;
}

interface EditProfileFormData {
  name: string;
  email: string;
  username: string;
}

export const accountApi = {
  patchChangePassword: (hashedFormData: ChangePasswordHashedFormData) =>
    client.patch("/account/password", hashedFormData, {
      withCredentials: true,
    }),
  deleteCloseAccount: (hashedFormData: CloseAccountHashedFormData) =>
    client.delete(`/account/close`, {
      withCredentials: true,
      data: hashedFormData,
    }),
  putEditProfile: (formData: EditProfileFormData) =>
    client.put(`/account`, formData, { withCredentials: true }),
  postEditProfileImg: (imgData: FormData) =>
    client.post("/account/profileImg", imgData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
