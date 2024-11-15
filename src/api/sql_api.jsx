import axios from "axios";

const baseUrl = "http://localhost:3000";

const getAllCourses = async () => {
  const res = await axios.get(`${baseUrl}/database/courses`);
  return res.data;
};

const getPersons = async (role_name = '') => {
  const res = await axios.get(`${baseUrl}/database/persons/${role_name}`);
  return res.data;
};

const getTeacherSectionAssignment = async (id) => {
  const res = await axios.get(
    `${baseUrl}/database/faculty_section_assignment/${id}`
  );
  return res.data;
};

const getStudentGrades = async (id) => {
  const res = await axios.get(`${baseUrl}/database/student_grades/${id}`);
  return res.data;
};

const getCourseSections = async (
  course_name,
  semester,
  start_year,
  end_year
) => {
  const res = await axios.get(
    `${baseUrl}/database/coursesections/${course_name}/${semester}/${start_year}/${end_year}`
  );
  return res.data;
};

const getStudentCourseSection = async (
  course_name,
  course_section_name,
  semester
) => {
  const res = await axios.get(
    `${baseUrl}/studentcoursesection/${course_name}/${course_section_name}/${semester}`
  );
  return res.data;
};

export { getAllCourses, getPersons, getTeacherSectionAssignment, getStudentGrades, getCourseSections, getStudentCourseSection };