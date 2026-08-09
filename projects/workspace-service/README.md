# Workspace Operation Service

## What it does

Append-oriented service for collaborative workspace operations. It accepts client operations, deduplicates retries, preserves insertion order, and exposes a small read API plus health check.

## Architecture

- Go `net/http` handlers expose `/operations` and `/healthz`.
- An in-memory store keeps the example runnable with no external services.
- `schema.sql` shows the PostgreSQL persistence shape, including JSONB payloads and a uniqueness constraint for idempotency.

## Run

```bash
go run .
```

The service listens on `http://localhost:8092`.

## Tests

```bash
go test ./...
```

## Design decisions

- Client operation IDs make retries safe.
- The write path returns a sequence number that can become a synchronization cursor.
- The in-memory implementation keeps the domain easy to inspect; PostgreSQL is the durable next step.

Append-oriented service for collaborative workspace operations. It demonstrates idempotent writes, ordered operation history, a health endpoint, and a PostgreSQL schema suitable for durable storage.

Run with `go test ./...` and `go run .`.
