// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import EmployeeList from "@/components/EmployeeList";
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

export default function Dashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch("/api/employees");
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }
    fetchEmployees();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/employees?id=${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete employee");
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div>
      <UserInfo />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Employee List</h1>
        <EmployeeList employees={employees} onDelete={handleDelete} />
      </div>
    </div>
  );
}
