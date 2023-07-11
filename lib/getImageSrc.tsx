import getIpfsLink from './getIpfsLink'

const getImageSrc = (song: any) => {
  const rawMetadataImage = song?.rawMetadata
  const mediaGateway = song?.media?.[0]?.gateway
  const isRawString = typeof rawMetadataImage === 'string'
  let rawMetadataHash
  if (isRawString) {
    let jsonStrings = rawMetadataImage.split('\n')
    let json1 = JSON.parse(jsonStrings[0])
    rawMetadataHash = json1?.image
  }
  const imageSrc = getIpfsLink(rawMetadataHash || mediaGateway)
  return imageSrc
}

export default getImageSrc
