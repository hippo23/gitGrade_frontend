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

const getPersons = async (accessToken, roleName = null) => {
  const res = await axios.get(`${baseUrl}/database/persons`, {
    params: {
      roleName: roleName,
    },
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

const getAuthIds = async (accessToken, data) => {
  await axios.get(`${baseUrl}/database/authid`, {
    params: {
      yearId: data.yearId,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const createCourseSection = async (accessToken, data) => {
  const res = await axios.post(
    `${baseUrl}/database/courses/coursesection`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res.data;
};

const updateCourseSection = async (accessToken, data) => {
  await axios.patch(`${baseUrl}/database/courses/coursesection`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const deleteCourseSection = async (accessToken, data) => {
  await axios.delete(`${baseUrl}/database/courses/coursesection`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      ...data,
    },
  });
};

const assignTeachersToCourseSection = async (accessToken, data) => {
  await axios.post(`${baseUrl}/database/courses/coursesection/teacher`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const deleteTeachersFromCourseSection = async (accessToken, data) => {
  await axios.delete(`${baseUrl}/database/courses/coursesection/teacher`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      ...data,
    },
  });
};

const getCalendarSessions = async (accessToken) => {
  const res = await axios.get(`${baseUrl}/database/calendar_sessions`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};

const deleteCalendarSession = async (accessToken, data) => {
  await axios.delete(`${baseUrl}/database/calendar_sessions`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      ...data,
    },
  });
};

const deleteCalendarSessionSemester = async (accessToken, data) => {
  await axios.delete(`${baseUrl}/database/calendar_sessions/semester`, {
    params: {
      ...data,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const getCalendarSessionSemester = async (accessToken) => {
  const res = await axios.get(
    `${baseUrl}/database/calendar_sessions/semester`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return res.data[0].jsonb_object_agg;
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
  getCalendarSessions,
  deleteCalendarSession,
  deleteCalendarSessionSemester,
  getCalendarSessionSemester,
  createCourseSection,
  updateCourseSection,
  deleteCourseSection,
  assignTeachersToCourseSection,
  deleteTeachersFromCourseSection,
};
