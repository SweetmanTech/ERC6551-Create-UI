const getUniqueSongList = (list) => {
  const seen = new Set()
  const result = list.filter((v) => {
    const address = v.contract.address
    if (!seen[address]) {
      seen[address] = true
      return true
    }
    return false
  }, {})
  return result
}

export default getUniqueSongList
