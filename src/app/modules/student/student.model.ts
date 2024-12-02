import { Schema, model, connect } from "mongoose";
import validator from 'validator';
import {
    TGuardian,
    TLocalGuardian,
    TStudent,
    StudentMethods,
    StudentModel,
    TUserName,
} from "./student.interface";

const UserNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        require: [true, 'first name is require'],
        maxlength: [20, 'name can not be more then 20 characters '],
        trim: true,
        validate: {
            validator: function (value: string) {
                const firstName = value.charAt(0).toUpperCase() + value.slice(1);
                return firstName === value;
                console.log(value)
            },
            message: "{VALUE} is not in capitalize formate"
        }
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        require: [true, 'last name is required'],
        validate: {
            validator: (value: string) => validator.isAlphanumeric(value),
            message: '{VALUE} is not valid'
        }

    },
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        require: true,
    },
    fatherContactNo: {
        type: String,
        require: true,
    },
    fatherOccupation: {
        type: String,
        require: true,
    },
    motherName: {
        type: String,
        require: true,
    },
    motherContactNo: {
        type: String,
        require: true,
    },
    motherOccupation: {
        type: String,
        require: true,
    },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        require: true,
    },
    occupation: {
        type: String,
        require: true,
    },
    contactNo: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>(
    {
      id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'User',
      },
      name: {
        type: UserNameSchema,
        required: [true, 'Name is required'],
      },
      gender: {
        type: String,
        enum: {
          values: ['male', 'female', 'other'],
          message: '{VALUE} is not a valid gender',
        },
        required: [true, 'Gender is required'],
      },
      dateOfBirth: { type: Date },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      contactNo: { type: String, required: [true, 'Contact number is required'] },
      emergencyContactNo: {
        type: String,
        required: [true, 'Emergency contact number is required'],
      },
      bloodGroup: {
        type: String,
        enum: {
          values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
          message: '{VALUE} is not a valid blood group',
        },
      },
      presentAddress: {
        type: String,
        required: [true, 'Present address is required'],
      },
      permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required'],
      },
      guardian: {
        type: guardianSchema,
        required: [true, 'Guardian information is required'],
      },
      localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local guardian information is required'],
      },
      profileImg: { type: String },
      admissionSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicSemester',
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      toJSON: {
        virtuals: true,
      },
    },
  );
  
  // virtual
  studentSchema.virtual('fullName').get(function () {
    return this.name.firstName + this.name.middleName + this.name.lastName;
  });
  
  // Query Middleware
  studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });


studentSchema.virtual('fullName').get(function () {
    return this.name.firstName + this.name.middleName + this.name.lastName
})




studentSchema.methods.isUserExits = async function (id: string) {
    const existingUser = await Student.findOne({ id })
    return existingUser
}


export const Student = model<TStudent, StudentModel>("Student", studentSchema);
