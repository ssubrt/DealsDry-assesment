
import Employee from '@/lib/Employee';
import { connectMongo } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';




export async function GET() {
  await connectMongo;
  const employees = await Employee.find({});
  return NextResponse.json(employees);
}

export async function POST(request: NextRequest) {
  await connectMongo();

  try {
    const data = await request.json();
    const newEmployee = new Employee(data);
    const savedEmployee = await newEmployee.save();
    
    return NextResponse.json(savedEmployee, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', error }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error creating employee', error }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  await connectMongo();

  if (id) {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Employee deleted successfully' });
  }
  
  return NextResponse.json({ message: 'Employee ID is required' }, { status: 400 });
}
