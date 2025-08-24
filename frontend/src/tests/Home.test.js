import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

test('renders home page with title', () => {
  renderWithRouter(<Home />);
  const titleElement = screen.getByText(/Web App Template/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders get started button', () => {
  renderWithRouter(<Home />);
  const getStartedButton = screen.getByText(/Get Started/i);
  expect(getStartedButton).toBeInTheDocument();
});

test('renders sign in link', () => {
  renderWithRouter(<Home />);
  const signInLink = screen.getByText(/Sign In/i);
  expect(signInLink).toBeInTheDocument();
});
