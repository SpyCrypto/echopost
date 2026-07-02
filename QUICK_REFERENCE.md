# EchoPost Quick Reference

## Setup (5 minutes)

```bash
# Clone the repo
git clone https://github.com/SpyCrypto/echopost
cd echopost-repo

# Create environment file
cp .env.example .env
# Edit .env with your credentials and Midnight private key

# Start services
docker compose up -d
```

## Compile Contract

```bash
# Quick compile (auto-generates managed/ directory)
docker compose run --rm contracts compact compile ./EchoPost.compact

# Verbose output for debugging
docker compose run --rm contracts compact compile --verbose ./EchoPost.compact

# Validate syntax without compiling
docker compose run --rm contracts compact validate ./EchoPost.compact
```

## Deploy to Midnight

```bash
# Set your private key
export MIDNIGHT_PRIVATE_KEY=0x...

# Deploy to Preprod
docker compose run --rm contracts compact deploy --network preprod --contract EchoPost

# Deploy to Preview
docker compose run --rm contracts compact deploy --network preview --contract EchoPost

# Verify deployment
docker compose run --rm contracts compact verify --network preprod --address <contract_address>
```

## Logs & Debugging

```bash
# Proof server logs
docker compose logs -f proof-server

# Contract development logs
docker compose logs -f contracts

# Frontend logs
docker compose logs -f frontend

# Relay API logs
docker compose logs -f relay

# All services
docker compose logs -f
```

## Interactive Development

```bash
# SSH into contracts environment
docker compose run --rm contracts bash

# Inside container:
compact compile ./EchoPost.compact
compact validate ./EchoPost.compact
ls -la ../managed/  # See generated circuits
npm run test        # Run tests (if configured)
```

## Common Tasks

| Task | Command |
|------|---------|
| View generated circuits | `ls -la echopost-repo/managed/circuits/` |
| Rebuild containers | `docker compose build --no-cache` |
| Stop all services | `docker compose down` |
| Clean up volumes | `docker compose down -v` |
| Check service health | `docker compose ps` |
| Proof server health | `curl http://localhost:6800/health` |
| Frontend | http://localhost:3000 |
| Relay API | http://localhost:8080 |

## Git Workflow

```bash
# After making changes to contract
git add contracts/EchoPost.compact
git commit -m "feat: update contract logic for credential storage"

# After compiling
git add managed/
git commit -m "ci: recompile Compact contract to circuits"

# Push to GitHub
git push origin main
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Proof server won't start | `docker compose build --no-cache proof-server && docker compose up proof-server` |
| Compilation fails | `docker compose run --rm contracts compact validate ./EchoPost.compact` |
| Can't deploy | Export `MIDNIGHT_PRIVATE_KEY` and fund wallet via faucet |
| Port conflicts | Change port in `docker-compose.yml` (e.g., `6801:6800`) |
| Need fresh start | `docker compose down -v && docker compose up` |

## Documentation

- **Full setup guide**: See `MIDNIGHT_SETUP.md`
- **Deployment checklist**: See `DEPLOYMENT_CHECKLIST.md`
- **Contract tests**: See `contracts/TESTS.md`
- **Docker deployment**: See `DOCKER_DEPLOYMENT.md`
- **GitHub Actions CI**: See `.github/workflows/compact-ci.yml`

## Resources

- [Midnight Docs](https://docs.midnight.network/)
- [Compact Language](https://docs.midnight.network/compact)
- [Proof Server API](https://docs.midnight.network/proof-server)
- [EchoPost GitHub](https://github.com/SpyCrypto/echopost)
