"use client";

import EmployeeList from "@/components/EmployeeList";
import { useEffect, useState } from "react";
import Link from 'next/link';
import UserInfo from "@/components/UserInfo";

interface Employee {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  course: string;
}

export default function EmployeeListPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Fetch all employees from the backend
    async function fetchEmployees() {
      const response = await fetch('/api/employees');
      const data = await response.json();
      setEmployees(data);
    }
    fetchEmployees();
  }, []);

  // Define handleDelete function to delete an employee by ID
  const handleDelete = async (id: string) => {
    await fetch(`/api/employees?id=${id}`, { method: 'DELETE' });
    setEmployees(employees.filter((employee) => employee._id !== id));
  };

  // Filter employees based on the search term
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <UserInfo />
      <div>
        <h1 className="text-bold font-medium text-2xl text-center pb-4 pt-8">Employee List</h1>
        
        {/* Search Box */}
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 w-1/2 border text-black text-bold font-medium border-gray-300 bg-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Employee List */}
        <EmployeeList employees={filteredEmployees} onDelete={handleDelete} />
        
        <div className="flex justify-center pt-4">
          <Link href="/add">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Add New Employee</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
