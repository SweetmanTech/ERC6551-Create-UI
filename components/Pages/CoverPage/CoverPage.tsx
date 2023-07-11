import { ConnectButton } from '@rainbow-me/rainbowkit'
import SongList from '../../SongList'
import { useEffect } from 'react'
import Title from './Title'
import { useAnimation } from 'framer-motion'
import Description from './Description'
import Navbar from '@components/Navbar'

const CoverPage = () => {
  const titleControls = useAnimation()
  const descriptionControls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      await titleControls.start('show')
      await descriptionControls.start('show')
    }
    sequence()
  }, [titleControls, descriptionControls])

  return (
    <div className="h-[100vh] bg-[url('/images/cover_background_mobile.png')] bg-cover bg-center bg-black">
      <Navbar />
      <div className="flex flex-col justify-center pt-11 pb-[100px] gap-5">
        <Title controls={titleControls} />
        <SongList />
      </div>
      <Description controls={descriptionControls} />
    </div>
  )
}

export default CoverPage
