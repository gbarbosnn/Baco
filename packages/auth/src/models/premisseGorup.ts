import { z } from 'zod'

export const premisseGroupSchema = z.object({
  __typename: z.literal('PremisseGroup').default('PremisseGroup'),
  id: z.string(),
})

export type premisseGroup = z.infer<typeof premisseGroupSchema>
