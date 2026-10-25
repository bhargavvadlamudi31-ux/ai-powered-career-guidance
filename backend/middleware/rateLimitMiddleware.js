// Lightweight in-memory rate limiter for authentication and AI endpoints
const rateLimitMap = new Map();

/**
 * Creates a rate limiting middleware
 * @param {number} maxRequests - Maximum allowed requests in window
 * @param {number} windowMs - Time window in milliseconds
 * @param {string} message - Error message when limit reached
 */
const createRateLimiter = (maxRequests = 60, windowMs = 60000, message = 'Too many requests, please try again shortly.') => {
  return (req, res, next) => {
    const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const routeKey = `${clientIp}:${req.baseUrl || req.path}`;
    const now = Date.now();

    const clientData = rateLimitMap.get(routeKey) || { count: 0, resetTime: now + windowMs };

    if (now > clientData.resetTime) {
      clientData.count = 1;
      clientData.resetTime = now + windowMs;
    } else {
      clientData.count++;
    }

    rateLimitMap.set(routeKey, clientData);

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - clientData.count));
    res.setHeader('X-RateLimit-Reset', Math.ceil(clientData.resetTime / 1000));

    if (clientData.count > maxRequests) {
      return res.status(429).json({
        success: false,
        message,
        retryAfterSeconds: Math.ceil((clientData.resetTime - now) / 1000)
      });
    }

    next();
  };
};

module.exports = {
  createRateLimiter,
  authRateLimiter: createRateLimiter(20, 60000, 'Too many login/registration attempts. Please wait one minute.'),
  aiRateLimiter: createRateLimiter(30, 60000, 'Assistant rate limit reached. Please wait a few moments before asking another question.')
};
