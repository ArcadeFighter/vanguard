import { defaultProgress } from '../defaults'

const weapons = ['Ratt', 'Top Break', '1911', 'Klauser', 'Machine Pistol']
const original = ['Ratt', 'Top Break', '1911', 'Klauser', 'Machine Pistol']

export default weapons.map(weapon => ({
  category: 'Pistole',
  name: weapon,
  dlc: !original.includes(weapon),
  progress: {
    aether: { ...defaultProgress },
    atomic: { ...defaultProgress }
  }
}));