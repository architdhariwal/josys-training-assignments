import React, { useState } from 'react';

function Login() {   
    const [uid, setUserId] = useState("");
    const [pwd, setPassword] = useState("");
    const [result, setResult] = useState(""); 
    const [errors, setErrors] = useState({
        uid: "",
        pwd: ""
    });

    function validateForm() {
        const newErrors = {
            uid: uid.trim() === "" ? "User ID is required" : "",
            pwd: pwd.trim() === "" ? "Password is required" : ""
        };

        if (uid.length > 0 && uid.length < 3) {
            newErrors.uid = "User ID must be at least 3 characters";
        }

        if (pwd.length > 0 && pwd.length < 6) {
            newErrors.pwd = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return !newErrors.uid && !newErrors.pwd;
    }

    function loginButton_click() {
        if (validateForm()) {
            if (uid === "admin" && pwd === "admin123") {   
                setResult("Welcome to Admin");
                setErrors({ uid: "", pwd: "" });
            } else {
                setResult("Invalid User Id or Password");
            }
        }
    }

    function handleSignUp() {
        alert("Sign Up clicked!");
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>
                
                <div className="space-y-4">
                    <div>
                        <input 
                            type="text" 
                            id="t1"  
                            placeholder='User Id' 
                            value={uid} 
                            onChange={(event) => {
                                setUserId(event.target.value);
                                setErrors(prev => ({ ...prev, uid: '' }));
                            }} 
                            required 
                            minLength={3} 
                            className={`w-full px-3 py-2 border rounded ${
                                errors.uid 
                                ? 'border-red-500 text-red-500' 
                                : 'border-gray-300'
                            }`}
                        />
                        {errors.uid && (
                            <p id="uid-error" className="text-red-500 text-sm mt-1">
                                {errors.uid}
                            </p>
                        )}
                    </div>

                    <div>
                        <input 
                            type="password"  
                            id="t2" 
                            placeholder='Password' 
                            value={pwd}  
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setErrors(prev => ({ ...prev, pwd: '' }));
                            }} 
                            required 
                            minLength={6}  
                            className={`w-full px-3 py-2 border rounded ${
                                errors.pwd 
                                ? 'border-red-500 text-red-500' 
                                : 'border-gray-300'
                            }`}
                        />
                        {errors.pwd && (
                            <p id="pwd-error" className="text-red-500 text-sm mt-1">
                                {errors.pwd}
                            </p>
                        )}
                    </div>

                    <button 
                        type="button" 
                        id="b1" 
                        onClick={loginButton_click}  
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </button>

                    {result && (
                        <p 
                            id="result" 
                            className={`text-center ${
                                result === "Welcome to Admin" 
                                ? "text-green-500" 
                                : "text-red-500"
                            }`}
                        >
                            {result}
                        </p>
                    )}

                    <div className="text-center mt-4">
                        <span className="text-gray-600 mr-2">New user?</span>
                        <a 
                            href="#" 
                            id="signup-link" 
                            onClick={handleSignUp}
                            className="text-blue-500 hover:text-blue-600"
                        >
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;