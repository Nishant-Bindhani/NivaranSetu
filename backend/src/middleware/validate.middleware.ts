import type { Request, Response, NextFunction } from 'express'
import type { ZodType } from 'zod'
import { AppError } from '@utils/AppError.js'

function parseOrThrow(schema: ZodType, data: unknown) {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw new AppError(result.error.issues[0].message, 400)
  }
  return result.data
}

export function validate(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.body = parseOrThrow(schema, req.body)
    next()
  }
}

export function validateQuery(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    // req.query can't be reassigned or reliably mutated in Express 5 (it's
    // a getter-only property, re-derived from the URL) — the validated,
    // coerced result is stored separately instead.
    req.validatedQuery = parseOrThrow(schema, req.query)
    next()
  }
}
