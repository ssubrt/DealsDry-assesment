
import Employee from '@/lib/Employee';
import { connectMongo } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';





export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectMongo();
  const employee = await Employee.findById(params.id);
  if (!employee) {
    return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
  }
  return NextResponse.json(employee);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await connectMongo();
  const data = await request.json();
  const updatedEmployee = await Employee.findByIdAndUpdate(params.id, data, { new: true });
  if (!updatedEmployee) {
    return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
  }
  return NextResponse.json(updatedEmployee);
}
