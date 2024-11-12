
"use client";

import Link from "next/link";
import toast from "react-hot-toast";

interface Employee {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  course: string;
}

interface EmployeeListProps {
  employees: Employee[];
  onDelete: (id: string) => void;
}

export default function EmployeeList({ employees, onDelete }: EmployeeListProps) {
  if (!employees || employees.length === 0) return <p className="text-center">No employees found.</p>;

  return (
    <table className="min-w-full bg-black">
      <thead>
        <tr>
          <th className="py-2 border">Name</th>
          <th className="py-2 border">Email</th>
          <th className="py-2 border">Mobile No</th>
          <th className="py-2 border">Designation</th>
          <th className="py-2 border">Gender</th>
          <th className="py-2 border">Course</th>
          <th className="py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td className="py-2 border text-center">{employee.name}</td>
            <td className="py-2 border text-center">{employee.email}</td>
            <td className="py-2 border text-center">{employee.mobile}</td>
            <td className="py-2 border text-center">{employee.designation}</td>
            <td className="py-2 border text-center">{employee.gender}</td>
            <td className="py-2 border text-center">{employee.course}</td>
            <td className="py-2 border text-center">
              <Link href={`/edit/${employee._id}`}>
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
              </Link>
              <button
                onClick={() => {
                  onDelete(employee._id);
                  toast.success("Deleted successfully");
                }
                  
                }
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
