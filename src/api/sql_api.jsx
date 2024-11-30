import axios from "axios";

const baseUrl = "http://localhost:3000";

const getAllCourses = async (accessToken) => {
  const res = await axios.get(`${baseUrl}/database/courses`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};

const getPersons = async (accessToken, role_name = "") => {
  const res = await axios.get(`${baseUrl}/database/persons/${role_name}`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

const getTeacherSectionAssignment = async (accessToken, id) => {
  const res = await axios.get(
    `${baseUrl}/database/faculty_section_assignment/${id}`,
    {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};

const getStudentGrades = async (accessToken, id) => {
  const res = await axios.get(`${baseUrl}/database/student_grades/${id}`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

const getCourseSections = async (accessToken, data) => {
  console.log(data);
  const res = await axios.get(`${baseUrl}/database/courses/section`, {
    params: data,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};

const getStudentCourseSection = async (
  accessToken,
  course_name,
  course_section_name,
  semester,
) => {
  const res = await axios.get(
    `${baseUrl}/database/studentcoursesection/${course_name}/${course_section_name}/${semester}`,
    {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};

const postAccountRequest = async ({
  email,
  firstname,
  middlename,
  lastname,
  role,
  birthday,
  address,
}) => {
  const data = {
    email: email,
    firstname: firstname,
    middlename: middlename,
    lastname: lastname,
    role: role,
    birthday: birthday,
    address: address,
  };

  console.log(data);

  await axios.post(`${baseUrl}/database/pendingAccounts`, data, {
    headers: {
      "content-type": "application/json",
    },
  });
};

const getPendingAccounts = async (accessToken) => {
  const res = await axios.get(`${baseUrl}/database/pendingAccounts`);
  return res.data;
};

const createNewPerson = async (accessToken, data) => {
  const res = await axios.post(`${baseUrl}/database/person`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};

const createCourse = async (accessToken, data) => {
  await axios.post(`${baseUrl}/database/courses`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export {
  getAllCourses,
  getPersons,
  getTeacherSectionAssignment,
  getStudentGrades,
  getCourseSections,
  getStudentCourseSection,
  postAccountRequest,
  getPendingAccounts,
  createNewPerson,
  createCourse,
};
