import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export function validate(schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source])

    if (!result.success) {
      const details: Record<string, string[]> = {}
      for (const issue of result.error.issues) {
        const key = issue.path.map(String).join('.') || 'value'
        details[key] = [...(details[key] || []), issue.message]
      }
      res.status(400).json({ error: 'Validation failed', details })
      return
    }

    req[source] = result.data
    next()
  }
}
