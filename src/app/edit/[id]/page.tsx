"use client";



import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import EmployeeForm from '@/components/EmployeeForm';
import UserInfo from '@/components/UserInfo';
import toast from 'react-hot-toast';


interface EmployeeData {
  name: string;
  age: number;
  position: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  course: string[];
  image?: string;
  // Add other employee fields here
}

const EditEmployeePage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch(`/api/edit/${id}`);
      const data = await response.json();
      setEmployeeData(data);
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const handleSubmit = async (data: EmployeeData) => {
    const response = await fetch(`/api/edit/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push('/list'); // Redirect to employee list after successful update
      toast.success('Updated successfully');
    } else {
      console.error("Failed to update employee data");
    }
  };

  if (!employeeData) return <p className='text-2xl font-bold text-center flex flex-col justify-center  '>Loading...</p>;

  return (
    <div>
      <UserInfo />
      <div className='bg-white'>
        <h1 className='text-center text-2xl text-black font-medium '>Edit Employee</h1>
        <EmployeeForm initialData={employeeData} onSubmit={handleSubmit} />

      </div>
    </div>
  );
};

export default EditEmployeePage;


