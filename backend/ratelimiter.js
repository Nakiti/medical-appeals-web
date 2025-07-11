import NodeCache from "node-cache";

export const usageCache = new NodeCache({ stdTTL: 86400 });

// Define your limits
export const LIMITS = {
  chat: 5, // Max 15 chat messages per day
  letter: 3, // Max 3 appeal letters per day
  parse: 5
};

/**
 * Middleware to check user request limits.
 * @param {'chat' | 'letter' | 'parse'} type - The type of request to limit.
 */
export const checkUsageLimit = (type) => (req, res, next) => {

   const userId = req.user?.id; 

   if (!userId) {
      return res.status(401).json({ error: "Authentication required." });
   }

   const limit = LIMITS[type];
   const cacheKey = `${type}-${userId}`;
   const currentUsage = usageCache.get(cacheKey) || 0;



   if (currentUsage >= limit) {
      const ttl = usageCache.getTtl(cacheKey); // TTL is in seconds
      const resetsAt = new Date(ttl).toISOString();

      return res.status(429).json({
         error: `You have exceeded your daily limit of ${limit} ${type} requests.`,
         usage: {
            limit: limit,
            remaining: 0,
            resetsAt: resetsAt,
         }
      });
   }

   const newUsage = currentUsage + 1
   usageCache.set(cacheKey, newUsage);

   res.locals.usage = {
      limit: limit,
      remaining: limit - newUsage,
   };
   console.log(`Usage for ${cacheKey}: ${newUsage}/${limit}`);

   next(); 
};