# EchoPost Midnight Deployment Checklist

This checklist ensures you meet all submission requirements for the EchoPost Midnight contract deployment.

## ✅ Toolchain Installation

- [ ] Midnight toolchain installed locally or via Docker
- [ ] Compact compiler available (`compact --version`)
- [ ] Proof server running on port 6800
- [ ] Node.js 22+ installed

**Verification Command:**
```bash
docker compose up -d proof-server
curl http://localhost:6800/health
```

## ✅ Smart Contract Development

- [ ] `contracts/EchoPost.compact` written with:
  - [ ] Public ledger state (`publishedPosts`)
  - [ ] Private witness structure (`PrivateWitness`)
  - [ ] Public functions: `publishToMultiple()`, `getPublishedPosts()`
  - [ ] Private functions with `disclose()` calls

- [ ] Contract compiles without errors
- [ ] `compact.config.json` configured

**Verification Command:**
```bash
docker compose run --rm contracts bash -c "compact compile ./EchoPost.compact"
```

## ✅ Generated Artifacts

- [ ] `managed/` directory exists with:
  - [ ] `circuits/EchoPost.circuit`
  - [ ] `circuits/EchoPost.vk` (verification key)
  - [ ] `keys/EchoPost.proving.key`

**Verification Command:**
```bash
ls -la echopost-repo/managed/circuits/
ls -la echopost-repo/managed/keys/
```

## ✅ Contract Deployment

- [ ] Wallet funded (use Midnight Preprod faucet)
- [ ] `MIDNIGHT_PRIVATE_KEY` exported
- [ ] Contract deployed to Preprod network
- [ ] Contract address obtained and verified

**Deployment Command:**
```bash
export MIDNIGHT_PRIVATE_KEY=0x...
docker compose run --rm contracts bash -c "compact deploy --network preprod --contract EchoPost"
```

**Expected Output:**
```
Contract deployed successfully!
Contract Address: 0x1234567890abcdef...
```

## ✅ Documentation

- [ ] `README.md` updated with:
  - [ ] Product vision paragraph
  - [ ] Tech stack section
  - [ ] Quick start instructions
  - [ ] Project structure
  - [ ] Environment setup

- [ ] `MIDNIGHT_SETUP.md` includes:
  - [ ] Installation & setup instructions
  - [ ] Compile & deploy commands
  - [ ] Local development guide
  - [ ] Troubleshooting section

- [ ] `contracts/TESTS.md` documents:
  - [ ] Test structure
  - [ ] Coverage goals
  - [ ] Example tests

- [ ] Public state vs private witness explained in README

## ✅ Screenshots

- [ ] **Compile Success**: Screenshot showing:
  ```
  ✓ Compilation successful
  Generated circuits:
  - EchoPost.circuit
  - EchoPost.vk
  - keys/EchoPost.proving.key
  ```
  
  Save as: `docs/screenshots/compile-success.png`

- [ ] **Deployment Success**: Screenshot showing:
  ```
  Contract deployed successfully!
  Contract Address: 0x1234567890abcdef...
  Network: preprod
  ```
  
  Save as: `docs/screenshots/deploy-success.png`

- [ ] **Proof Server Running**: Screenshot from:
  ```bash
  docker compose logs proof-server
  # or
  curl -s http://localhost:6800/health | jq .
  ```
  
  Save as: `docs/screenshots/proof-server-running.png`

## ✅ Git Commits (Minimum 5)

Create at least 5 meaningful commits:

1. **Initial Setup**
   ```bash
   git commit -m "feat: initialize Midnight toolchain and contract scaffold"
   ```

2. **Contract Development**
   ```bash
   git commit -m "feat: implement EchoPost contract with public posts and private credentials"
   ```

3. **Docker Integration**
   ```bash
   git commit -m "ci: add Midnight Docker services (proof-server, contracts)"
   ```

4. **Contract Compilation**
   ```bash
   git commit -m "ci: compile EchoPost Compact contract to ZK circuits"
   ```

5. **Documentation & Deployment**
   ```bash
   git commit -m "docs: add MIDNIGHT_SETUP.md with deployment instructions"
   ```

6. **Additional**: Add tests, GitHub Actions CI, contract enhancements, etc.

**View commits:**
```bash
git log --oneline | head -10
```

## ✅ GitHub Repository

- [ ] Repository is public
- [ ] README.md visible on main page
- [ ] All documentation files present
- [ ] Screenshots in `docs/screenshots/`
- [ ] `.env.example` provided (no secrets in `.env`)
- [ ] `docker-compose.yml` and Dockerfiles present

## ✅ Final Verification

Run full checklist:

```bash
# Build all containers
docker compose build

# Compile contract
docker compose run --rm contracts bash -c "compact compile ./EchoPost.compact"

# Verify artifacts
test -d managed/circuits && test -d managed/keys && echo "✓ Artifacts generated"

# Check Git commits
git log --oneline | wc -l | awk '{if ($1 >= 5) print "✓ Minimum 5 commits"}' 

# Verify documentation
test -f README.md && test -f MIDNIGHT_SETUP.md && test -f contracts/TESTS.md && echo "✓ Documentation complete"

# Check public state explanation
grep -q "Public State" README.md && echo "✓ Public state documented"
grep -q "Private Witness" README.md && echo "✓ Private witness documented"
```

## Submission Template

```markdown
## EchoPost Midnight Deployment

**Repository**: https://github.com/SpyCrypto/echopost

**Contract Address (Preprod)**: 0x...

**Screenshots**:
- Compile output: [Link or embedded image]
- Deployment success: [Link or embedded image]

**Product Idea**:
[Your 1-paragraph product vision here]

**Commits**: 
- [List your 5+ commits]

**Key Features**:
- Public ledger state for post metadata
- Private witness for encrypted credentials
- Selective disclosure via disclose()
- Multi-platform publishing coordination
```

---

**Once all boxes are checked, commit and push to GitHub, then submit your repository URL.**
