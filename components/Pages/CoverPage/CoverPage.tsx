import SongList from '../../SongList'
import { useAnimation } from 'framer-motion'
import { useEffect } from 'react'

const CoverPage = () => {
  const titleControls = useAnimation()
  const descriptionControls = useAnimation()
  const connectControls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      await titleControls.start('show')
      await descriptionControls.start('show')
      await connectControls.start('show')
    }
    sequence()
  }, [titleControls, descriptionControls, connectControls])

  return (
    <div className="md:pt-[200px] flex text-white flex-col justify-center items-center h-[100vh] gap-11 md:gap-[50px] bg-black bg-cover bg-center">
      <SongList />
    </div>
  )
}

export default CoverPage
