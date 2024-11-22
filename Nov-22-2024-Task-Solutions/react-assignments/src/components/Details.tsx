import React from 'react';
import { Link, useParams } from 'react-router-dom';

interface Emp {
    empno: number;
    ename: string;
    job: string;
    deptno: number;
}

const Details: React.FC = () => {
    let empsArray: Emp[] = [
        { empno: 10256, ename: "Scott", job: "Manager", deptno: 10 },
        { empno: 10257, ename: "Smith", job: "Lead", deptno: 20 },
        { empno: 10258, ename: "Sandy", job: "Programmer", deptno: 30 },
        { empno: 10259, ename: "Sam", job: "Tester", deptno: 40 }
    ];

    const { id } = useParams<{ id: string }>();
    const empObj: Emp | undefined = empsArray.find(item => item.empno == Number(id));

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Selected Employee Details</h3>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
                <div className="space-y-2">
                    <p><span className="font-medium">Employee Number:</span> {empObj?.empno}</p>
                    <p><span className="font-medium">Employee Name:</span> {empObj?.ename}</p>
                    <p><span className="font-medium">Employee Job:</span> {empObj?.job}</p>
                    <p><span className="font-medium">Employee Deptno:</span> {empObj?.deptno}</p>
                </div>
                <div className="pt-4">
                    <Link to="/employees" className="text-blue-500 hover:text-blue-700">
                        Back to Employees
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Details;