import { launcherProgress } from '../defaults'

const weapons = ['M1 Bazooka', 'Panzerschreck', 'Panzerfaust', 'MK11 Launcher']
const original = ['M1 Bazooka', 'Panzerschreck', 'Panzerfaust', 'MK11 Launcher']

export default weapons.map(weapon => ({
  category: 'Launchery',
  name: weapon,
  dlc: !original.includes(weapon),
  progress: {
    aether: { ...launcherProgress },
    atomic: { ...launcherProgress }
  }
}));