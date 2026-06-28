# EchoPost Provider Integrations

## Overview

EchoPost supports publishing to multiple content platforms through a unified, extensible provider architecture.

## Currently Supported Providers

### Medium

**Status**: ✅ Live

**Capabilities**:
- Publish articles with full formatting
- Support for images and embeds
- Draft saving
- Article tagging
- Reading time calculation

**Authentication**: OAuth 2.0
**Rate Limits**: Medium API rate limits (see docs)
**Special Features**:
- Automatic canonical URL handling
- Medium subscription status support

**Configuration**:
```env
MEDIUM_TOKEN=your-medium-integration-token
```

### Dev.to

**Status**: ✅ Live

**Capabilities**:
- Publish articles
- Series support
- Tag management
- Cover image upload
- Front matter metadata

**Authentication**: API Key
**Rate Limits**: 10 requests per second
**Special Features**:
- Auto-publish or draft
- Scheduled publishing (future)
- Canonical URL management

**Configuration**:
```env
DEVTO_API_KEY=your-devto-api-key
```

### LinkedIn

**Status**: 🔄 In Progress (Phase 2)

**Planned Capabilities**:
- Article publishing
- Post publishing
- Image sharing
- Link sharing
- Company page support (future)

**Authentication**: OAuth 2.0
**Rate Limits**: 100 actions per hour
**Special Features**:
- Profile vs. company publication
- Engagement tracking

**Configuration**:
```env
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
```

### X (Twitter)

**Status**: 🔄 In Progress (Phase 2)

**Planned Capabilities**:
- Tweet publishing
- Thread support
- Media uploads
- Quote tweets
- Reply-to support

**Authentication**: OAuth 2.0 (API v2)
**Rate Limits**: 300 tweets per 15 minutes
**Special Features**:
- Character count optimization
- Thread chunking
- Media optimization

**Configuration**:
```env
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret
```

### Notion

**Status**: 🔄 In Progress (Phase 2)

**Planned Capabilities**:
- Create database pages
- Block content publishing
- Database field mapping
- Relation support

**Authentication**: OAuth 2.0
**Rate Limits**: 3 requests per second
**Special Features**:
- Database schema mapping
- Rich block types
- Relation linking

**Configuration**:
```env
NOTION_API_KEY=your-notion-api-key
NOTION_DATABASE_ID=your-database-id
```

## Roadmap Providers

### Phase 3 (Q3 2024)

#### Hashnode

**Capabilities**:
- Article publishing
- Series management
- Tag system
- Reading time calculation
- Custom domain support

**Documentation**: https://hashnode.com/api

#### Ghost

**Capabilities**:
- Post publishing
- Page creation
- Tag management
- Featured image support

**Documentation**: https://ghost.org/docs/api

#### WordPress

**Capabilities**:
- Post publishing
- Media upload
- Category management
- Custom fields

**Documentation**: https://developer.wordpress.org/rest-api/

#### Substack

**Capabilities**:
- Post publishing
- Email sending
- Archive management
- Draft creation

**Documentation**: https://substack.com/api

### Phase 4 (Q4 2024)

#### Discord

**Capabilities**:
- Channel posting
- Webhook integration
- Rich embeds
- Thread creation

#### Telegram

**Capabilities**:
- Channel posting
- Bot integration
- Message formatting
- Media sharing

#### Slack

**Capabilities**:
- Channel posting
- Workspace integration
- Message formatting
- File uploads

#### Mastodon

**Capabilities**:
- Status posting
- Media sharing
- Hashtag support
- Federated publishing

## Provider Architecture

### Provider Interface

All providers implement a standard interface:

```typescript
interface Provider {
  id: string;
  name: string;
  description: string;
  
  // Authentication
  authenticate(credentials: Credentials): Promise<AuthToken>;
  refresh(token: AuthToken): Promise<AuthToken>;
  revoke(token: AuthToken): Promise<void>;
  
  // Publishing
  publish(content: Content, token: AuthToken): Promise<PublishResult>;
  schedule(content: Content, time: Date, token: AuthToken): Promise<ScheduleResult>;
  draft(content: Content, token: AuthToken): Promise<DraftResult>;
  
  // Content Formatting
  formatContent(content: Content): FormattedContent;
  getMetadata(content: Content): ProviderMetadata;
  
  // Status & Tracking
  getStatus(publishId: string, token: AuthToken): Promise<PublishStatus>;
  getAnalytics(publishId: string, token: AuthToken): Promise<Analytics>;
}
```

### Adding a New Provider

1. **Create provider module** in `apps/relay/src/providers/<provider-name>`

2. **Implement provider class**:
   ```typescript
   class MyProvider implements Provider {
     // Implement all required methods
   }
   ```

3. **Add authentication handler**:
   - OAuth 2.0 flow
   - Token refresh logic
   - Error handling

4. **Implement content formatter**:
   - Platform-specific markup
   - Media handling
   - Length/format validation

5. **Add tests**:
   - Unit tests for formatting
   - Integration tests with API
   - Error scenario handling

6. **Update UI**:
   - Add to provider selection
   - Create auth flow component
   - Add status display

7. **Documentation**:
   - Update this file
   - Add provider-specific guide
   - Document rate limits

### Testing Providers

```bash
# Run provider tests
npm run test:providers

# Test specific provider
npm run test:providers -- --provider=medium

# Integration test
npm run test:providers:integration
```

## Content Formatting

### Standard Transformations

Each provider receives content in a normalized format and transforms it:

**Input Format**:
```typescript
{
  title: string;
  content: string;  // Markdown
  images: Image[];
  tags: string[];
  metadata: {
    description?: string;
    author?: string;
    date?: Date;
  }
}
```

**Provider-Specific Transformations**:
- Markdown to platform markup
- Image resizing and optimization
- Content truncation if needed
- Tag formatting per platform

## Rate Limiting

EchoPost respects platform rate limits:

| Provider | Rate Limit | Retry Strategy |
|----------|-----------|-----------------|
| Medium | Varies | Exponential backoff |
| Dev.to | 10 req/s | Queued |
| LinkedIn | 100/hour | Scheduled |
| X | 300/15min | Queued |
| Notion | 3 req/s | Exponential backoff |

## Error Handling

Providers handle common errors:

- **Authentication errors**: Re-authenticate user
- **Rate limit errors**: Queue and retry later
- **Content errors**: Validate and notify user
- **Network errors**: Exponential backoff
- **Provider errors**: Log and report to user

## Analytics Integration

Each provider tracks:

- Publishing success/failure rate
- Time to publish
- API response times
- Error rates
- User engagement (where available)

## Future Enhancements

- **Bi-directional sync**: Pull content from platforms
- **Engagement metrics**: Real-time analytics
- **Smart routing**: Suggest platforms based on content
- **Content preview**: Platform-specific previews
- **Scheduling**: Advanced scheduling per platform
- **A/B testing**: Test content variations

---

Have a provider in mind? Request it on GitHub or join our Discord community!
