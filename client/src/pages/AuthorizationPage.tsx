import React from 'react';
import LoginBody from '../components/authorization-components/LoginBody';
import LoginHeader from '../components/authorization-components/LoginHeader';
// import SignUpBody from "../components/authorization-components/SignUpBody";
// import SignUpHeader from "../components/authorization-components/SignUpHeader"

function LoginPage() {
  return (
    <div className="login-container">
      <LoginHeader />
      <LoginBody />
    </div>
  );
}

// const SignUpPage = () => {
//   return (
//     <div className="signup-container">
//         <SignUpHeader/>
//         <SignUpBody/>
//     </div>
//   )
// }

export default LoginPage;

// export default SignUpPage;
