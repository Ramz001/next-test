# Tech Testing TODO

## Drizzle ORM

* [ ] Install & connect to Neon
* [ ] Define sample tables & run migrations
* [ ] Test CRUD, joins, transactions

## React 19 + Next 16

* [ ] Upgrade React & enable Next 16 features
* [ ] Test page & component view transitions
* [ ] Experiment with `useTransition` & `SuspenseList`

## React Hook Form

* [ ] Install & integrate with test forms
* [ ] Test validation with Valibot schemas
* [ ] Test submission & error handling

## tRPC

* [ ] Install & configure tRPC server & client
* [ ] Create sample queries & mutations
* [ ] Integrate with React components/forms
* [ ] Test error handling & type safety

## RTK Query

* [ ] Install Redux Toolkit & RTK Query
* [ ] Create sample API slice
* [ ] Integrate with React components
* [ ] Test caching, invalidation, and error handling

## Shadcn UI

* [ ] Add 7 new components to test pages
* [ ] Test responsiveness & interactions
* [ ] Check SSR compatibility

## Logging / Observability

* [X] Add structured logging to API
* [X] Set up OpenTelemetry Collector
* [X] Connect to Grafana Loki, Prometheus, Zipkin
* [X] Test tracing & metrics collection

## Authentication – Full Features

### RBAC (Role-Based Access Control)

* [ ] Define roles in DB: `admin`, `user`, etc.
* [ ] Protect routes/components based on role
* [ ] Test admin-only, user-only pages and unauthorized access

### OAuth / Social Logins

* [ ] Connect to Google / GitHub / Apple (or mock endpoints)
* [ ] Test login, account linking, and token refresh

### Multi-Session / Device Management

* [ ] Allow multiple active sessions per user
* [ ] Track sessions in DB (device, browser, last active)
* [ ] Test login from multiple devices, single session invalidation, and global logout

### Password Security

* [ ] Check against **Have I Been Pwned** API on sign-up / password change
* [ ] Enforce strong password rules via Valibot

### Recovery / Forgot Password

* [ ] Implement “forgot password” flow with email link / token (Resend)
* [ ] Token expiration & validation
* [ ] Test updating password after recovery

### OTP / 2FA

* [ ] Implement TOTP or Email OTP
* [ ] Test login with OTP
* [ ] Test recovery via OTP
* [ ] Optional: Enable/disable 2FA per user

### Session & Token Management

* [ ] Use JWT or secure cookies
* [ ] Implement refresh token workflow
* [ ] Invalidate old tokens on password change
* [ ] Test expiration, refresh, and logout

### Integration with Stack

* [ ] Use tRPC / RTK Query for API calls (auth + CRUD)
* [ ] Validate forms with React Hook Form + Valibot (signup, login, password reset)
* [ ] Use Shadcn UI for forms, modals, OTP input, and session management UI

## Testing Stack

### Unit / Integration Tests

* [ ] Install **Vitest** (`npm i -D vitest @testing-library/react @testing-library/jest-dom`)
* [ ] Write unit tests for:
  * Drizzle DB queries
  * Valibot validation schemas
  * Utility functions (auth helpers, password checks, token helpers)
* [ ] Write integration tests for:
  * tRPC queries & mutations
  * Forms (React Hook Form + Valibot)
  * Auth flows (signup → login → protected routes)

### End-to-End (E2E) Tests

* [ ] Install **Playwright** (`npm i -D @playwright/test`)
* [ ] Test full flows:
  * Signup → Email verification → Login → OTP / 2FA
  * CRUD operations with RTK Query / tRPC
  * Multi-session & RBAC flows
  * Password recovery & reset
* [ ] Mock external services:
  * Resend email sandbox
  * OAuth providers
  * Have I Been Pwned API
