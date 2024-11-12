"use client";

import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface EmployeeFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

export default function EmployeeForm({ initialData = {}, onSubmit }: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: '',
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    if (type === "checkbox") {
      if (checked) {
        setFormData((prevState:any) => ({
          ...prevState,
          course: [...prevState.course, value],
        }));
      } else {
        setFormData((prevState:any) => ({
          ...prevState,
          course: prevState.course.filter((course:any) => course !== value),
        }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl text-bold text-black font-semibold text-center mb-6">Employee</h2>

        <div className="mb-4">
          <label className="block text-md font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Designation:</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender:</label>
          <div className="flex items-center font-medium text-black">
            <label className="mr-4 font-medium">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                className="mr-2 text-black font-medium"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                className="mr-2 text-black"
              />
              Female
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Courses:</label>
          <div className="flex items-center text-black">
            <label className="mr-4">
              <input
                type="checkbox"
                name="course"
                value="MCA/BCA"
                checked={formData.course.includes("MCA/BCA")}
                onChange={handleChange}
                className="mr-2"
              />
              MCA/BCA
            </label>
            <label className="mr-4">
              <input
                type="checkbox"
                name="course"
                value="BSC"
                checked={formData.course.includes("BSC")}
                onChange={handleChange}
                className="mr-2"
              />
              BSC
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Upload Image (optional):</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept=".jpg,.jpeg,.png"
          />
          {/* {formData.image && <img src={formData.image} alt="Uploaded Preview" className="mt-4 w-full h-auto rounded-md" />} */}
          {formData.image && (
  <Image
    src={formData.image}
    alt="Uploaded Preview"
    className="mt-4 w-full h-auto rounded-md"
    width={500} // Set the appropriate width
    height={300} // Set the appropriate height
    layout="responsive" // Optional: To maintain aspect ratio
  />
)}

        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
