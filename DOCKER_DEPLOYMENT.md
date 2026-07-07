# EchoPost Docker Deployment Guide

## Local Development

Start all services with:

```bash
docker compose up --pull always
```

This will:
- Build the relay service (Node.js backend) on port 4000
- Build the frontend service (Next.js) on port 3000
- Both services connect via the `echopost-network` bridge network
- Hot reload enabled via volume mounts

Access the app at `http://localhost:3000`

### Environment Variables

The `docker-compose.yml` uses environment variables from your `.env` files. For OAuth credentials in development, add them to `.env` or set them in `docker-compose.yml`.

### Stop Services

```bash
docker compose down
```

---

## Production Deployment

### GitHub Actions CI/CD

The `.github/workflows/docker-build.yml` workflow automatically:
1. Builds images for both relay and frontend on every push to `main`
2. Pushes images to GitHub Container Registry (ghcr.io)
3. Tags with git branch, commit SHA, and semver versions
4. Uses layer caching for faster rebuilds

**Images are pushed to:**
- `ghcr.io/SpyCrypto/echopost-relay:latest`
- `ghcr.io/SpyCrypto/echopost-frontend:latest`

### Manual Image Build

```bash
# Build relay
docker build -f Dockerfile.relay -t echopost-relay:latest .

# Build frontend
docker build -f Dockerfile.frontend -t echopost-frontend:latest .
```

### Deploy to a Remote Server

**Option 1: Docker Compose on a VPS**

```bash
# On your server, create a production docker-compose.yml:
version: '3.9'
services:
  relay:
    image: ghcr.io/SpyCrypto/echopost-relay:latest
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - PORT=8080
      - CORS_ORIGIN=https://yourdomain.com
      - AES_KEY=${AES_KEY}  # Set via .env on server
      - MEDIUM_API_KEY=${MEDIUM_API_KEY}
      # ... other OAuth credentials
    restart: always
    networks:
      - echopost-network

  frontend:
    image: ghcr.io/SpyCrypto/echopost-frontend:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_RELAY_URL=https://api.yourdomain.com
      - RELAY_URL=http://relay:4000
    depends_on:
      - relay
    restart: always
    networks:
      - echopost-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro  # Add your SSL certs here
    depends_on:
      - frontend
    restart: always
    networks:
      - echopost-network

networks:
  echopost-network:
    driver: bridge
```

Then deploy with:
```bash
docker compose -f docker-compose.prod.yml up -d
```

**Option 2: Deploy to Railecho $MIDNIGHT_PRIVATE_KEY
echo $MIDNIGHT_PRIVATE_KEY
way.app**

1. Push this repo to GitHub
2. Connect your GitHub repo to Railway: https://railway.app
3. Add services:
   - Service 1 (Relay): Dockerfile.relay, expose port 4000
   - Service 2 (Frontend): Dockerfile.frontend, expose port 3000
4. Set environment variables in Railway dashboard
5. Railway auto-deploys on push

**Option 3: Deploy to Fly.io**

Create `fly.toml`:
```toml
app = "echopost"

[build]
  dockerfile = "Dockerfile.relay"

[[services]]
  protocol = "tcp"
  internal_port = 4000
  external_port = 80

[env]
  NODE_ENV = "production"
```

Then deploy:
```bash
fly deploy
```

---

## Monitoring & Logs

**Local development:**
```bash
docker compose logs -f relay
docker compose logs -f frontend
```

**Production (on server):**
```bash
docker logs -f echopost-relay-1
docker logs -f echopost-frontend-1
```

---

## Security Notes

1. **Never commit `.env` files** — they contain secrets
2. **Use environment variable secrets** in GitHub Actions
3. **Use non-root user** — both Dockerfiles create nodejs user
4. **Enable HTTPS in production** — use Nginx reverse proxy with SSL
5. **Scan images** — use `docker scan` or integrate with Snyk
6. **Keep base images updated** — use Alpine for minimal attack surface
