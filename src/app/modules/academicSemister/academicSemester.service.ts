import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { AcademicSemester } from "./academicSemester.model";
import { TAcademicSemester } from "./academicSemister.interface";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {


    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester code')
    }


    const result = await AcademicSemester.create(payload)
    return result;
}


const getAllAcademicSemestersFromDB = async()=>{
    const result = await AcademicSemester.find()
    return result
}

const getSingleAcademicSemesterFromDB = async(id:string)=>{
    const result = await AcademicSemester.findById(id)
    return result
}



export const AcademicSemesterService = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB
}