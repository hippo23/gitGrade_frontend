import axios from "axios";

const baseUrl = "http://localhost:3000";

const getAllCourses = async (accessToken) => {
  const res = await axios.get(`${baseUrl}/admin/course`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};

const getPersons = async (accessToken, roleName = null) => {
  console.log(roleName)
  const res = await axios.get(`${baseUrl}/admin/users`, {
    params: {
      filterBy: roleName != null ? roleName.toLowerCase() : roleName,
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
  const res = await axios.get(`${baseUrl}/admin/course/${data.courseId}/section`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};

const getStudentCourseSection = async (accessToken, { courseSectionId }) => {
  const res = await axios.get(
    `${baseUrl}/admin/course/section/${courseSectionId}/student`,
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
  const res = await axios.post(`${baseUrl}/admin/users`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};

const createCourse = async (accessToken, data) => {
  console.log(data)
  await axios.post(`${baseUrl}/admin/course`, data, {
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
    `${baseUrl}/admin/course/section`,
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
  await axios.patch(`${baseUrl}/admin/course/section`, data, {
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
  await axios.patch(`${baseUrl}/admin/course/section/teacher`, data, {
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
    params: {
      ...data,
    },
  });
};

const getCalendarSessions = async (accessToken) => {
  const res = await axios.get(`${baseUrl}/general/calendar_sessions`, {
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
    `${baseUrl}/general/calendar_sessions/semesters`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return res.data
};

const updateStudentCourseSection = async (accessToken, data) => {
  await axios.patch(`${baseUrl}/admin/course/section/student`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const assignStudentsToCourseSection = async (accessToken, data) => {
  await axios.post(`${baseUrl}/admin/course/section/student`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const deleteStudentsFromCourseSection = async (accessToken, data) => {
  await axios.delete(`${baseUrl}/database/courses/coursesection/details`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      ...data,
    },
  });
};

const deployStudentGrades = async (accessToken, data) => {
  await axios.patch(`${baseUrl}/admin/course/section/grades`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      action: 'deploy'
    }
  });
};

const clearStudentGrade = async (accessToken, data) => {
  await axios.patch(
    `${baseUrl}/admin/course/section/grades`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        action: 'clear_grade'
      }
    },
  );
};

const updateCourse = async (accessToken, data) => {
  console.log({ is_bulk: true, ...data })
  await axios.patch(`${baseUrl}/admin/course`, { is_bulk: true, ...data }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const deleteCourse = async (accessToken, data) => {
  await axios.delete(`${baseUrl}/admin/course/${data.courseId}`, {
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
  getCalendarSessions,
  deleteCalendarSession,
  deleteCalendarSessionSemester,
  getCalendarSessionSemester,
  createCourseSection,
  updateCourseSection,
  deleteCourseSection,
  assignTeachersToCourseSection,
  deleteTeachersFromCourseSection,
  updateStudentCourseSection,
  assignStudentsToCourseSection,
  deleteStudentsFromCourseSection,
  deployStudentGrades,
  clearStudentGrade,
  updateCourse,
  deleteCourse,
};
