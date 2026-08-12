import type { AccessTokenPayload } from '@utils/jwt.js'

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload
      // req.query is a getter-only property in Express 5 — can't be
      // reassigned or reliably mutated, so validated/coerced query params
      // are stored here instead.
      validatedQuery?: unknown
    }
  }
}

export {}
