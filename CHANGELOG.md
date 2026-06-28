# Changelog

All notable changes to EchoPost will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- User authentication system with JWT
- Content editor with markdown support
- Multi-platform publishing architecture
- Medium integration
- Dev.to integration
- REST API foundation
- Credential encryption (AES-256)
- Publishing status dashboard
- Docker Compose development setup

### Changed

- Restructured project directory organization
- Updated README with comprehensive documentation
- Enhanced security guidelines

### Fixed

- Git directory lock issues
- Environment variable configuration

## [0.1.0] - 2024-01-15

### Added

- Initial MVP release
- Basic user registration and login
- Content draft creation and editing
- Medium and Dev.to platform support
- Encrypted credential storage
- Basic publishing workflow
- API documentation
- Docker deployment support

### Features

#### Authentication
- Email/password registration
- JWT-based authentication
- Session management
- Password hashing with bcrypt

#### Publishing
- Write content in markdown
- Save drafts
- Select target platforms
- Publish to multiple platforms simultaneously
- View publishing status

#### Platforms
- **Medium**: Full article publishing
- **Dev.to**: Article publishing with tags

#### Security
- AES-256 encryption for credentials
- User permission-based publishing
- Revokable access tokens
- No plaintext secrets

#### Infrastructure
- Docker containerization
- PostgreSQL database
- Express.js backend
- React frontend
- REST API

### Documentation

- README with quick start guide
- Architecture documentation
- Security guidelines
- Provider integration guide
- Contribution guidelines
- Code of Conduct

## Roadmap

### Phase 2 (Q2 2024)

- LinkedIn integration
- X (Twitter) integration
- Notion integration
- Basic analytics dashboard
- Team collaboration features
- Advanced scheduling

### Phase 3 (Q3 2024)

- AI-assisted formatting
- AI-generated social posts
- Advanced scheduling with timezones
- Content templates
- Team workspaces
- Engagement tracking

### Phase 4 (Q4 2024)

- Plugin marketplace
- CLI tool
- Browser extension
- GraphQL API
- Self-hosted deployment
- Community integrations

### Phase 5+ (2025+)

- Mobile applications
- Enterprise features
- Multi-language support
- Global deployment
- Advanced AI capabilities

## Versioning

EchoPost uses [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes (e.g., 1.0.0 → 2.0.0)
- **MINOR**: New features, backward compatible (e.g., 1.0.0 → 1.1.0)
- **PATCH**: Bug fixes, backward compatible (e.g., 1.0.0 → 1.0.1)

### Pre-release Versions

- **Alpha** (e.g., 0.1.0-alpha.1): Early testing, may be unstable
- **Beta** (e.g., 0.1.0-beta.1): Late testing, relatively stable
- **RC** (e.g., 0.1.0-rc.1): Release candidate, production ready

## Release Schedule

- **Quarterly major releases**: Q1, Q2, Q3, Q4
- **Bi-weekly patch releases**: Bug fixes and hotfixes
- **Monthly minor releases**: New features and improvements

## Support

- **Current**: Latest version only
- **Security**: 1 year after release
- **Bugfixes**: Until next major version

## Deprecations

Breaking changes are announced:
1. **Deprecation notice**: In changelog and documentation
2. **Warning period**: Minimum 1 release cycle (1-3 months)
3. **Removal**: Happens in next major version

---

For detailed release notes, visit:
https://github.com/SpyCrypto/echopost/releases

To report issues or request features:
https://github.com/SpyCrypto/echopost/issues
