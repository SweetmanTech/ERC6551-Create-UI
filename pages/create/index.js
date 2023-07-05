import CreatePage from '@components/CreatePage/CreatePage'
import { MusicMetadataProvider } from 'music-metadata-ipfs'
import { CreateDropProvider } from '@providers/CreateDropProvider'

const Create = () => (
  <MusicMetadataProvider>
    <CreateDropProvider>
      <CreatePage />
    </CreateDropProvider>
  </MusicMetadataProvider>
)

export default Create
