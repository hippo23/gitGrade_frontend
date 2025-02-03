import axios from "axios";
const baseUrl = "http://localhost:3000";

// function to get all user accounts
const getUserAccounts = async (accessToken, queryParameters = '') => {
  const res = await axios.get(`${baseUrl}/admin/users/auth`, {
    params: { queryParameters },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return res.data
}

// function to update specific user accounts
const updateUserAccount = async (accessToken, id, data) => {
  await axios.patch(`${baseUrl}/admin/users/auth`, { userId: id, data }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return;
};

const getAllRoles = async (accessToken, id) => {
  const response = await axios.get(`${baseUrl}/roles`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

const getUserRoles = async (accessToken, id) => {
  const response = await axios.get(`${baseUrl}/admin/users/${id}/roles`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

const clearUserRoleRecords = async (accessToken, id, data) => {
  await axios.delete(`${baseUrl}/auth/users/${id}/roles/clear_records`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      role_names: [...data.role_names],
      personid: data.personid,
    },
  });
};

const disableUserRoles = async (accessToken, id, data) => {
  await axios.delete(`${baseUrl}/auth/users/${id}/roles/disable`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      roles: [...data.roles],
    },
  });
};

const updateUserRoles = async (accessToken, data, action) => {
  await axios.patch(`${baseUrl}/admin/users/roles`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      action
    }
  })
}

export {
  getUserAccounts,
  updateUserAccount,
  getUserRoles,
  disableUserRoles,
  clearUserRoleRecords,
  getAllRoles,
  updateUserRoles
};
