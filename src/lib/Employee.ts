import mongoose, { Schema, Document } from 'mongoose';

interface IEmployee extends Document {
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  course: string[];
  image: string;
  createdAt: Date;
}

const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: [String], required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Employee || mongoose.model<IEmployee>('Employee', EmployeeSchema);
