# Contributing to EchoPost

Thank you for considering contributing to EchoPost! We welcome contributors of all experience levels. This document provides guidelines and instructions for contributing.

## Code of Conduct

Please read and follow our [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md). We are committed to providing a welcoming and inclusive environment for all contributors.

## Ways to Contribute

### 🐛 Report Bugs

Found a bug? Help us fix it:

1. **Check existing issues** to avoid duplicates
2. **Create a detailed issue** with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs. actual behavior
   - Environment details (OS, Node version, etc.)
   - Screenshots if applicable

### 💡 Suggest Features

Have an idea? We'd love to hear it:

1. **Check GitHub Discussions** for similar suggestions
2. **Open a discussion** with:
   - Feature title and description
   - Use case and benefit
   - Example workflow
   - Alternative solutions considered

### 📚 Improve Documentation

Documentation is crucial:

- Fix typos and clarify confusing sections
- Add examples or use cases
- Improve API documentation
- Add troubleshooting guides
- Translate documentation

### 🔧 Build Integrations

Add support for new platforms:

1. Check the [Provider Integration Guide](./docs/providers.md)
2. Implement the provider interface
3. Add tests and documentation
4. Submit a pull request

### ✅ Review & Test

Help with:

- Code review on pull requests
- Testing new features
- Security reviews
- Performance testing
- Cross-browser testing

### 💻 Submit Code

Ready to code? Follow these steps:

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- PostgreSQL (optional for local dev)
- Docker (optional)

### Setup Development Environment

1. **Fork the repository**

```bash
git clone https://github.com/YOUR_USERNAME/echopost.git
cd echopost
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env.local`**

```bash
cp .env.example .env.local
```

4. **Start development server**

```bash
npm run dev
```

5. **Run tests**

```bash
npm run test
```

## Development Workflow

### Creating a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

**Branch naming conventions**:
- `feature/add-medium-integration`
- `fix/auth-token-expiry`
- `docs/update-readme`
- `chore/update-dependencies`

### Making Changes

1. **Write code** following our style guidelines
2. **Add tests** for your changes
3. **Update documentation** if needed
4. **Keep commits atomic** and descriptive

### Commit Messages

Write clear, descriptive commit messages:

```
feat: add LinkedIn integration

- Implement OAuth 2.0 authentication
- Add content formatter for LinkedIn articles
- Handle rate limiting and retries
- Add unit tests for provider

Closes #123
```

**Format**: `<type>: <subject>`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance and tooling

### Code Style

We use:
- **TypeScript** for all code
- **ESLint** for linting
- **Prettier** for formatting
- **Husky** for pre-commit hooks

**Run linting**:
```bash
npm run lint
npm run lint:fix
```

**Format code**:
```bash
npm run format
```

### Testing

Write tests for new features:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test
npm run test -- path/to/test.spec.ts
```

**Test guidelines**:
- Aim for >80% code coverage
- Test happy paths and error scenarios
- Use descriptive test names
- Mock external API calls

### Documentation

Update relevant documentation:

- **Code comments**: Explain complex logic
- **README**: Update features or setup
- **API docs**: Document new endpoints
- **Provider guide**: For new integrations
- **CHANGELOG**: Document user-facing changes

## Pull Request Process

### Before Submitting

1. **Pull latest main**: `git pull origin main`
2. **Rebase your branch**: `git rebase origin/main`
3. **Run tests**: `npm run test`
4. **Lint code**: `npm run lint:fix`
5. **Build project**: `npm run build`

### Submit Pull Request

1. **Push your branch**:
```bash
git push origin feature/your-feature-name
```

2. **Open PR on GitHub** with:
   - Clear title and description
   - Reference to related issue: `Fixes #123`
   - Screenshots/videos if UI changes
   - Testing instructions
   - Breaking changes (if any)

3. **PR Template** (automatically provided):
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## Testing
How to test these changes

## Checklist
- [ ] Tests pass
- [ ] Code linted
- [ ] Documentation updated
- [ ] No breaking changes
```

### PR Review

- Respond to feedback promptly
- Request changes if needed
- Be open to suggestions
- Thank reviewers!

### Merging

Once approved:
- Project maintainers will merge
- Delete your feature branch

## Security

### Reporting Security Issues

**Do NOT** open public issues for security vulnerabilities.

Email: `security@echopost.dev`

See [SECURITY.md](./docs/security.md) for details.

### Security Guidelines

- Never commit secrets or credentials
- Use `.env.local` for sensitive values
- Follow OWASP guidelines
- Validate all user input
- Review security implications

## Provider Development

### Adding a New Platform

See [Provider Integration Guide](./docs/providers.md) for detailed instructions.

### Testing Providers

```bash
npm run test:providers
npm run test:providers:integration
```

## Design & Architecture

- Review [Architecture Guide](./docs/architecture.md)
- Follow existing patterns
- Ask before major refactors
- Discuss architecture changes in issues first

## Performance

- Monitor bundle size
- Profile slow operations
- Optimize queries
- Cache where appropriate
- Discuss performance concerns

## Accessibility

- Follow WCAG 2.1 guidelines
- Test with keyboard navigation
- Support screen readers
- Use semantic HTML
- Include alt text for images

## Questions?

- **GitHub Discussions**: Ask questions
- **Discord Community**: Chat with team
- **Email**: contact@echopost.dev

## Compensation

While EchoPost is volunteer-driven, we recognize significant contributions:

- Featured in CONTRIBUTORS.md
- Recognition on Twitter
- Swag (when available)
- Consider for team (future)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for making EchoPost better! 🎉

**Happy Contributing!**
