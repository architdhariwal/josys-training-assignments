import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Emp {
    empno: number;
    ename: string;
    job: string;
    deptno: number;
}

export default function Emps() {
    let empData: Emp[] = [
        { empno: 10256, ename: "Scott", job: "Manager", deptno: 10 },
        { empno: 10257, ename: "Smith", job: "Lead", deptno: 20 },
        { empno: 10258, ename: "Sandy", job: "Programmer", deptno: 30 },
        { empno: 10259, ename: "Sam", job: "Tester", deptno: 40 },
        { empno: 10256, ename: "Scott", job: "Manager", deptno: 10 },
        { empno: 10257, ename: "Smith", job: "Lead", deptno: 20 },
        { empno: 10258, ename: "Sandy", job: "Programmer", deptno: 30 },
        { empno: 10259, ename: "Sam", job: "Tester", deptno: 40 },
    ];

    const [empsArray, setEmpsArray] = useState<Emp[]>(empData);

    return (
        <div className="p-6">
            <h3 className="text-2xl font-semibold mb-4">All Employee Details</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 border-b text-left">Emp Number</th>
                            <th className="py-3 px-4 border-b text-left">Emp Name</th>
                            <th className="py-3 px-4 border-b text-left">Emp Job</th>
                            <th className="py-3 px-4 border-b text-left">Emp Deptno</th>
                            <th className="py-3 px-4 border-b text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {empsArray.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                <td className="py-2 px-4 border-b">{item.empno}</td>
                                <td className="py-2 px-4 border-b">{item.ename}</td>
                                <td className="py-2 px-4 border-b">{item.job}</td>
                                <td className="py-2 px-4 border-b">{item.deptno}</td>
                                <td className="py-2 px-4 border-b">
                                    <Link to={"/Details/" + item.empno} className="text-blue-500 hover:text-blue-700">
                                        Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}