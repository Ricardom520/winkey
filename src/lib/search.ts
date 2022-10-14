import { axios } from './index'

function wait (ms) {
  return new Promise(resolve => setTimeout(() => resolve(null), ms))
}

async function searchWinkeyNpm(key: string) {
  try {
    await wait(2000)
    const rs = await axios.get(
      `https://www.npmjs.com/search/suggestions?q=${key}`,
      {
        timeout: 3000
      }
    )
      
    return rs.data || []
  } catch (err) {
    return []
  }
}

/** 返回Seed包 */
export async function listSeed() {
  let winkeySeeds = []

  try {
    const res = await searchWinkeyNpm('winkey-init-project-')

    // 兜底接口挂了，就用默认配置了
    if (!res.length) {
      winkeySeeds = ['winkey-init-project-seed-react']
    } else {
      winkeySeeds = res.map(item => item.name)
    }

    return winkeySeeds
  } catch (er) {
    er
  }

  return winkeySeeds
}