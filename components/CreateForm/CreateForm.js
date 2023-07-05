import { Box, Input } from 'degen'
import CreateDropButton from '@components/CreateDropButton'
import { useCreateDrop } from '@providers/CreateDropProvider'

const CreateForm = () => {
  const {
    lengthOfDrop,
    setLengthOfDrop,
    setMusicMetadata,
    publicSalePrice,
    setPublicSalePrice,
    fundsRecipient,
    setFundsRecipient,
  } = useCreateDrop()

  return (
    <Box
      display="flex"
      flexDirection="column"
      width={{ md: '180' }}
      alignItems="center"
      gap="5"
      marginBottom={15}
    >
      <Input
        placeholder="ipfs://"
        label="music metadata"
        onChange={(e) => {
          setMusicMetadata(e.target.value)
        }}
      />
      <Input
        placeholder={lengthOfDrop}
        type="number"
        label="number of days for drop"
        min={0}
        step={1}
        onChange={(e) => {
          setLengthOfDrop(e.target.value)
        }}
      />
      <Input
        placeholder={publicSalePrice}
        type="number"
        label="price (wei)"
        min={0}
        step={1}
        onChange={(e) => {
          setPublicSalePrice(e.target.value)
        }}
      />
      <Input
        placeholder={fundsRecipient}
        label="seller funds recipient"
        onChange={(e) => {
          setFundsRecipient(e.target.value)
        }}
      />
      <CreateDropButton />
    </Box>
  )
}

export default CreateForm
