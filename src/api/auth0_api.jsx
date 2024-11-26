import axios from "axios";
const baseUrl = "http://localhost:3000";

// function to get all user accounts
const getUserAccounts = async (accessToken, queryParameters = null) => {
  if (queryParameters == null) {
    const res = await axios.get(`${baseUrl}/auth/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } else {
    const res = await axios.get(`${baseUrl}/auth/users`, {
      params: queryParameters,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  }
};

// function to update specific user accounts
const updateUserAccount = async (accessToken, id, data) => {
  await axios.patch(`${baseUrl}/auth/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return;
};

const getUserRoles = async (accessToken, id) => {
  const response = await axios.get(`${baseUrl}/auth/users/${id}/roles`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

const deleteUserRoles = async (accessToken, id, data) => {
  await axios.delete(`${baseUrl}/auth/users/${id}/roles`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const addUserRoles = async (accessToken, id, data) => {
  await axios.post(`${baseUrl}/auth/users/${id}/roles`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export {
  getUserAccounts,
  updateUserAccount,
  getUserRoles,
  deleteUserRoles,
  addUserRoles,
};
