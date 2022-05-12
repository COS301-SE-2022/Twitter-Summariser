import { render, screen } from '@testing-library/react';

import ReactDOM from 'react-dom';

import Signup from '../Signup';

describe('Testing sum', () => {
    function sum(a: number, b: number) {
        return a + b;
    }

    it('should equal 4', () => {
        expect(sum(2, 2)).toBe(4);
    });

    test('aslso should be equal 4', () => {
        expect(sum(2, 2)).toBe(4);
    });
});

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Signup />, div);
});
