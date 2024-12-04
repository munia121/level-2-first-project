import { model, Schema } from "mongoose";

import { TAcademicSemester } from "./academicSemister.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constant";




const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        require: true,
        enum: AcademicSemesterName,

    },
    year: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true,
        enum: AcademicSemesterCode

    },
    startMonth: {
        type: String,
        require: true,
        enum: Months,
    },
    endMonth: {
        type: String,
        require: true,
        enum: Months,
    },
},
    {
        timestamps: true,
    }
)


academicSemesterSchema.pre("save", async function (next) {
    const isSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        name: this.name,
    })
    if (isSemesterExists) {
        throw new Error('Semester is already exist')
    }
})




export const AcademicSemester = model<TAcademicSemester>("AcademicSemester", academicSemesterSchema)