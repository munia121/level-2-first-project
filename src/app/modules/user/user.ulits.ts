import { TAcademicSemester } from "../academicSemister/academicSemister.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //   console.log("Last Student:", lastStudent); // Debugging
  //   console.log("Extracted ID:", lastStudent?.id?.substring(6)); // Debugging

  //203001   0001
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};







export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  // 0001  => 1
  let currentId = (0).toString(); //by default 0000

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6) //01
  const lastStudentYear = lastStudentId?.substring(0, 4) //2030
  const currentSemesterCode = payload.code;
  const currentYear = payload.year


  if (lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear) {
    currentId = lastStudentId.substring(6)
  }


  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;

  // console.log(await findLastStudentId())

};



