import rateLimit from 'express-rate-limit'
import { config } from '@config/env.js'
import { errorResponse } from '@utils/apiResponse.js'

export const authRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: config.AUTH_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorResponse('Too many requests, please try again later'),
})

export const apiRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: config.API_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorResponse('Too many requests, please try again later'),
})

// A 6-digit OTP has only 1,000,000 possible values — the general
// authRateLimit (10 req/60s across ALL auth routes) is nowhere near tight
// enough to stop it being brute-forced. This caps guesses at the code-check
// endpoints specifically, independent of how many other auth calls a
// client has made this window.
export const otpAttemptRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorResponse('Too many attempts, please request a new code'),
})
