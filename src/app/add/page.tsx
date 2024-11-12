"use client";

import EmployeeForm from '@/components/EmployeeForm';
import UserInfo from '@/components/UserInfo';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddEmployee() {
  const router = useRouter();

  // Handle form submission to create a new employee
  const handleSubmit = async (data: any) => {
    const response = await fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push('/list'); // Redirect to employee list after adding employee
      toast.success('Added successfully');
    } else {
      console.error("Failed to create employee");
    }
  };

  return (
    <div>
        <UserInfo />
        <div >
       
        <EmployeeForm onSubmit={handleSubmit} />
        </div>
      
    </div>
  );
}
