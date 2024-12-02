import { model, Schema } from "mongoose";

import { TAcademicSemester,  TMonths } from "./academicSemister";


const months:TMonths[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        require: true
    },
    year: {
        type: Date,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    startMonth: {
        type: String,
        enum: months,
    },
    endMonth: {
        type: String,
        enum: months,
    },
},
    {
        timestamps: true,
    }
)


const academicSemester = model<TAcademicSemester>("AcademicSemester", academicSemesterSchema)