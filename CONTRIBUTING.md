# Contributing to Web App Template

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `./setup.sh`
4. Create a new branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Test your changes: `npm run test`
7. Commit your changes: `git commit -m "Add your feature"`
8. Push to your fork: `git push origin feature/your-feature-name`
9. Open a Pull Request

## Code Style

- Use consistent indentation (2 spaces)
- Follow ESLint rules for frontend
- Use meaningful variable and function names
- Add comments for complex logic
- Write tests for new features

## Project Structure

```
├── backend/           # Express.js API
│   ├── config/        # Database and Firebase config
│   ├── middleware/    # Express middleware
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   └── tests/         # Backend tests
├── frontend/          # React.js application
│   ├── public/        # Static files
│   ├── src/
│   │   ├── components/# React components
│   │   ├── contexts/  # React contexts
│   │   ├── pages/     # Page components
│   │   └── config/    # App configuration
└── docs/              # Documentation
```

## Commit Message Convention

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

## Testing Guidelines

- Write unit tests for utility functions
- Write integration tests for API endpoints
- Write component tests for React components
- Ensure all tests pass before submitting PR

## Bug Reports

When reporting bugs, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Node.js version, etc.)
- Screenshots if applicable

## Feature Requests

When requesting features, please include:
- Use case description
- Proposed solution
- Alternative solutions considered
- Additional context
