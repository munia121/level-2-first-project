import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepertment.interface";
import AppError from "../../error/AppError";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        require: true,
        unique:true
    },
    academicFaculty:{
        type:Schema.Types.ObjectId,
        ref:"AcademicFaculty",
    }
},
    {
        timestamps: true,
    }
)


academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExist = await AcademicDepartment.findOne({
      name: this.name,
    });
  
    // if (isDepartmentExist) {
    //   throw new AppError(
    //     httpStatus.NOT_FOUND,
    //     'This department is already exist!',
    //   );
    // }
  
    next();
  });
  


academicDepartmentSchema.pre("findOneAndUpdate", async function(next){
    const query = this.getQuery();

    const isDepartmentExist = await AcademicDepartment.findOne(query)

    if(!isDepartmentExist){
        throw new AppError(httpStatus.NOT_FOUND,'This department does not exist!!')
    }

    next()
})



export const AcademicDepartment = model<TAcademicDepartment>("AcademicDepartment", academicDepartmentSchema)