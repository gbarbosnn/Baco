import { z } from 'zod'

import { premisseGroupSchema } from '../models/premisseGorup'

export const premisseSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Premisse'), premisseGroupSchema]),
])
