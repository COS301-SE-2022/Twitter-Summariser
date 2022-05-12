import { render, screen } from '@testing-library/react';

import ReactDOM from 'react-dom';

import Signup from '../Signup';

describe("Rendering Tests For Components Signup", () =>{
    //Test to see if Landing is rendered
    it("renders without crashing", () => {
        const { getByTestId } = render(<Signup />);
        const up = getByTestId("signup");
        expect(up).toBeTruthy();
    });
})