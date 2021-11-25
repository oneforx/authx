import { render } from '@testing-library/react';

import AuthxReact from './authx-react';

describe('AuthxReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthxReact />);
    expect(baseElement).toBeTruthy();
  });
});
