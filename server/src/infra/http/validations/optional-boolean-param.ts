import { z } from 'zod'

export const optionalBooleanParam = () =>
  z
    .string()
    .optional()
    .superRefine((val, ctx) => {
      if (val !== undefined && val !== 'true' && val !== 'false') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid boolean.'
        })
      }
    })
    .transform(val => {
      if (val === undefined) return undefined
      return val === 'true'
    })
