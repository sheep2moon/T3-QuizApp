import { signIn } from "next-auth/react";
import React from "react";

const Signup = () => {
    const handleLogin = () => {
        signIn();
    };

    return (
        <div>
            <button onClick={handleLogin}>Sign In</button>
        </div>
    );
};

export default Signup;
