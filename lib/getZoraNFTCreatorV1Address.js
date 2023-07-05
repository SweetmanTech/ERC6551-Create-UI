const getZoraNFTCreatorV1Address = (chainId) => {
  if (chainId === 1) {
    return '0xebBb2552C6f647026A1AE715d2037B50F0B5E401'
  }
  if (chainId === 137) {
    return '0x351b5BB4bdDd1b01d9511B48c61BE6a7A4f42dAe'
  }
  if (chainId === 80001) {
    return '0xC551Fc4fBadc6dF12C4f98C6956E000990929837'
  }
  if (chainId === 5) {
    return '0x314dE0B249D94241FB9601D77439aEB5870B2dA2'
  }
  return '0x314dE0B249D94241FB9601D77439aEB5870B2dA2'
}

export default getZoraNFTCreatorV1Address
