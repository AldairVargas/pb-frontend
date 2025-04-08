import React, { useState } from "react";
import MyLogin from "./Login";
import MyRegister from "./Register";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin((prev) => !prev);

  return (
    <div>
      {isLogin ? (
        <MyLogin onSwitchForm={toggleForm} />
      ) : (
        <MyRegister onSwitchForm={toggleForm} />
      )}
    </div>
  );
};

export default AuthPage;
