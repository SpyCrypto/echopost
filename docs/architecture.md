# EchoPost Architecture

## System Overview

EchoPost is built as a distributed publishing platform with the following high-level architecture:

```
             Write Content

                  │

          ┌───────────────┐
          │   EchoPost    │
          └───────────────┘

                  │

     ┌────────────┼─────────────┐
     │            │             │
 Medium        LinkedIn      X

     │            │             │

 Dev.to       Notion      Future APIs
```

## Core Components

### Frontend (`apps/frontend`)

- **Technology**: React / Next.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux or Zustand
- **Responsibilities**:
  - Content editor with live preview
  - Platform selection interface
  - Credentials management UI
  - Publishing status dashboard
  - User authentication flows

### Relay Server (`apps/relay`)

- **Technology**: Node.js / Express with TypeScript
- **Database**: PostgreSQL or MongoDB with Prisma ORM
- **Responsibilities**:
  - Authentication & authorization
  - Credential encryption/decryption
  - Content distribution orchestration
  - API gateway for platform integrations
  - Publishing status tracking
  - Error handling and retries

### API Integrations

Supported provider APIs:
- **Medium**: REST API for article publishing
- **Dev.to**: REST API for article publishing
- **X (Twitter)**: API v2 for tweet posting
- **LinkedIn**: REST API for article and post publishing
- **Notion**: REST API for page creation
- Future integrations with Hashnode, Ghost, WordPress, etc.

## Data Flow

1. **User writes content** via the frontend editor
2. **Content stored locally** (never sent before publishing)
3. **User selects platforms** and clicks "Submit Once"
4. **Relay server retrieves encrypted credentials** from vault
5. **Content formatted per platform specifications**
6. **Simultaneous API calls** to all selected platforms
7. **Status tracked and reported** in real-time to frontend
8. **Failures retried** with exponential backoff

## Security Architecture

### Credential Management

- Credentials encrypted with **AES-256**
- Encryption keys stored separately from encrypted data
- User permission required for each publish action
- Access revocable at any time
- Audit logging for credential access

### Authentication

- JWT tokens signed with HS256
- Tokens include user ID and permissions
- Refresh token rotation for security
- Session management with timeout

### Data Protection

- All API communications over HTTPS
- Passwords hashed with bcrypt (12 rounds)
- Secrets never embedded in code
- Environment variables for sensitive config
- Rate limiting on API endpoints

## Deployment Architecture

### Local Development

- Docker Compose for local PostgreSQL
- Hot reload for frontend and backend
- Development environment variables

### Production

- Containerized deployment with Docker
- Horizontal scaling for relay servers
- PostgreSQL replicas for high availability
- Redis for session management and caching
- CDN for static assets
- Load balancer for traffic distribution

## Extensibility

### Plugin System

EchoPost is designed to support plugin-based providers:

```
Provider Interface
    ↓
┌───────────────────┐
│ Medium Provider   │
│ Dev.to Provider   │
│ Custom Provider   │
└───────────────────┘
    ↓
Relay Server → Platform APIs
```

### Adding New Providers

1. Implement `ProviderInterface`
2. Handle authentication flow
3. Implement content formatting
4. Add error handling
5. Register in provider registry
6. Add UI for platform selection

## Performance Considerations

- Content published simultaneously to all platforms
- Database queries optimized with indexes
- Caching layer for frequently accessed data
- Rate limiting to respect platform API limits
- Batch operations where supported

## Monitoring & Logging

- Structured logging for all operations
- Error tracking with Sentry or similar
- Performance monitoring
- Publishing analytics dashboard
- Real-time status updates via WebSockets

---

For detailed security information, see [security.md](./security.md)
For roadmap and future architecture changes, see [roadmap.md](./roadmap.md)
