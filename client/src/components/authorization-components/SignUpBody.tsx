import React from 'react'

const submitSignUpForm = () => {
    //insert code to submit SignUp form
}

const SignUpBody = () => {
    return (
        <div className="signup-body">
            <form onSubmit={submitSignUpForm}>
                <input type="text" placeholder="Name" />
                <br />
                <input type="text" placeholder="Phone or email" />
                <br />
                <input type="password" placeholder="Password" />
                <br />
                <input type="date" placeholder="DOB" />
                <br />
                <input type="submit" value="Sign up" />
            </form>
        </div>
    )
}

export default SignUpBody
