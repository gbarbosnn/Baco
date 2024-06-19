import type { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import type { User } from './models/user'
import type { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(user, { can, cannot }) {
    can('manage', 'all')

    cannot('update', 'User')
    can('update', 'User', { id: { $eq: user.id } })
  },
  MEMBER(user, { can, cannot }) {
    cannot('manage', 'all')

    can(['get', 'update'], 'User', { id: { $eq: user.id } })
    can(['get', 'create', 'update'], ['Product', 'GroupPremisse', 'Premisse'])
  },
}
