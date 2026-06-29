# EchoPost Docker Deployment Guide

## Local Development

Start all services with:

```bash
docker compose up --pull always
```

This will:
- Build the relay service (Node.js backend) on port 8080
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

**Option 2: Deploy to Railway.app**

1. Push this repo to GitHub.
2. Connect your GitHub repo to Railway: https://railway.app.
3. Create a **Relay** service from the repo. The root `railway.json` already tells Railway to build with `Dockerfile.relay` and expose port `8080`.
4. Create a **Frontend** service from the same repo. In the Railway dashboard, set its **Dockerfile path** to `Dockerfile.frontend` and expose port `3000`.
5. Add the required environment variables in the Railway dashboard for each service (see below).
6. Railway auto-deploys on every push to `main`.

### Railway environment variables

**Relay service**
- `NODE_ENV=production`
- `PORT=8080`
- `CORS_ORIGIN=https://your-frontend-domain.railway.app`
- `AES_KEY=<64-char-hex-key>` (generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- Add OAuth credentials as needed: `MEDIUM_API_KEY`, `X_API_KEY`, `LINKEDIN_ACCESS_TOKEN`, `NOTION_TOKEN`, etc.

**Frontend service**
- `NODE_ENV=production`
- `NEXT_PUBLIC_RELAY_URL=https://your-relay-domain.railway.app`
- `RELAY_URL=https://your-relay-domain.railway.app`

> **Note:** `NEXT_PUBLIC_` variables must be set at build time, so set them before the first deploy or redeploy after changing them.

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
