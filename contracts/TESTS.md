# EchoPost Contract Tests

A collection of test scenarios for the EchoPost Compact contract.

## Running Tests

```bash
docker compose run --rm contracts npm run test

# Or specific test file
docker compose run --rm contracts npm run test -- contracts/tests/publish.test.compact
```

## Test Structure

### 1. publish.test.compact - Public Post Publishing

- Verify post metadata is recorded on public ledger
- Check timestamp and author tracking
- Validate multi-platform publishing

### 2. credentials.test.compact - Private Credential Storage

- Verify private witness encryption
- Test selective disclosure of platform names
- Ensure credentials remain encrypted

### 3. integration.test.compact - End-to-End Flow

- User publishes to multiple platforms
- Credentials stored privately
- Public ledger shows only metadata
- Non-author cannot access credentials

## Example Test

```compact
test "PublishPost should record metadata on public ledger" {
  let echopost = deploy(EchoPost);
  
  let postId = 0x0123456789abcdef;
  let platforms = ["medium", "x", "linkedin"];
  
  echopost.publishToMultiple(
    postId,
    "My First Privacy Post",
    0xabcdef0123456789,
    platforms
  );
  
  let posts = echopost.getPublishedPosts();
  assert(posts.length == 1);
  assert(posts[0].title == "My First Privacy Post");
  assert(posts[0].platforms.length == 3);
}
```

## Coverage Goals

- 90%+ line coverage
- All public functions tested
- Private witness encryption validated
- Proof generation and verification working
