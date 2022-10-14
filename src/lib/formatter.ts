const YY_SEED_FULL_PREFIX = '@winkey/init-project-seed-'
const SEED_FULL_PREFIX = 'init-project-seed-'
const YY_SEED_SHORT_PREFIX = '@winkey/'

const REG = {
  YY_SEED_FULL_PREFIX: new RegExp(`^${YY_SEED_FULL_PREFIX}`),
  YY_SEED_SHORT_PREFIX: new RegExp(`^${YY_SEED_SHORT_PREFIX}`),
  SEED_FULL_PREFIX: new RegExp(`^${SEED_FULL_PREFIX}`)
}

export const seedFull2Short = (name) => {
  return name
    .replace(REG.YY_SEED_FULL_PREFIX, YY_SEED_SHORT_PREFIX)
    .replace(REG.SEED_FULL_PREFIX, '')
}