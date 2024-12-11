import { AcademicDepartment } from "./academicDepartment.model";
import { TAcademicDepartment } from "./academicDepertment.interface";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {

    // const isDepartmentExist = await AcademicDepartment.findOne({
    //     name: payload.name
    // })

    // if (isDepartmentExist) {
    //     throw new Error("This name is already exist!!")
    // }

    const result = await AcademicDepartment.create(payload)
    console.log('departemnt result',result)
    return result;
}


const getAllAcademicDepartmentsFromDB = async () => {
    const result = await AcademicDepartment.find().populate('academicFaculty')
    return result
}

const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result = await AcademicDepartment.findById(id)
    return result
}


const updateAcademicDepartmentFromDB = async (id: string, payload: Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    })
    return result
}



export const AcademicDepartmentService = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentFromDB
}