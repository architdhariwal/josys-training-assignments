import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from './context/AuthContext';

const Login: React.FC = () => {
    const [uid, setUserId] = useState<string>("");
    const [pwd, setPassword] = useState<string>("");
    const [result, setResult] = useState<string>("");

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    async function loginButton_click() {
        const queryString = location.search;
        let strReturnUrl = new URLSearchParams(queryString).get('returnUrl') || '/';

        const success = await login(uid, pwd);
        if (success) {
            navigate(strReturnUrl);
        } else {
            setResult("Invalid User Id or Password");
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <fieldset className="border border-gray-300 rounded-lg p-6">
                <legend className="text-xl font-semibold px-2">User Login</legend>

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">User Id:</label>
                        <input 
                            type="text" 
                            value={uid} 
                            onChange={(event) => setUserId(event.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Password:</label>
                        <input 
                            type="password" 
                            value={pwd} 
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        onClick={loginButton_click}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                    
                    {result && <p className="text-red-500 mt-2">{result}</p>}
                </div>
            </fieldset>
        </div>
    );
};

export default Login;