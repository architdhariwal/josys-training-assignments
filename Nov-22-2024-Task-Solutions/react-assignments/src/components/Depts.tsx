import React from 'react';

interface Dept {
    deptno: number;
    dname: string;
    loc: string;
}

const Depts: React.FC = () => {
    let deptsArray: Dept[] = [
        { deptno: 10, dname: "Accounts", loc: "Hyd" },
        { deptno: 20, dname: "Sales", loc: "Pune" },
        { deptno: 30, dname: "Admin", loc: "Hyd" },
        { deptno: 40, dname: "Marketing", loc: "Mumbai" }
    ];

    return (
        <div className="p-6">
            <h3 className="text-2xl font-semibold mb-4">All Departments</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 border-b text-left">Deptno</th>
                            <th className="py-3 px-4 border-b text-left">Dname</th>
                            <th className="py-3 px-4 border-b text-left">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deptsArray.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                <td className="py-2 px-4 border-b">{item.deptno}</td>
                                <td className="py-2 px-4 border-b">{item.dname}</td>
                                <td className="py-2 px-4 border-b">{item.loc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Depts;