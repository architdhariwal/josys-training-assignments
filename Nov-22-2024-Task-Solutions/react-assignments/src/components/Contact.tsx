import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contact: React.FC = () => {
    const navigate = useNavigate();
    const buttonClick = () => {
        navigate("/");
    }

    return (
        <div className="bg-blue-100 p-6 rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Contact Page</h1>
            <div className="space-y-4">
                <p className="text-gray-700">
                    This page provides contact details of company. This page provides contact details of company.
                    This page provides contact details of company. This page provides contact details of company.
                    This page provides contact details of company.
                </p>
                <p className="text-gray-700">
                    This page provides contact details of company. This page provides contact details of company.
                    This page provides contact details of company. This page provides contact details of company.
                    This page provides contact details of company.
                </p>
            </div>
            <hr className="my-4 border-blue-200" />
            <button
                onClick={buttonClick}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
                Go to Home
            </button>
        </div>
    );
};

export default Contact;