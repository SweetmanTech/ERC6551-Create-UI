import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Box, Text } from 'degen'
import CreateForm from '@components/CreateForm'

const CreatePage = () => (
  <Box backgroundColor="black" display="flex" flexDirection="column" alignItems="center">
    <Box
      display="flex"
      padding="6"
      marginBottom="12"
      minWidth="full"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text>Wura, A Narrative</Text>
      <ConnectButton />
    </Box>
    <CreateForm />
  </Box>
)

export default CreatePage
