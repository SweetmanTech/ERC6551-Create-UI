import { useAccount } from 'wagmi'
import CustomConnectButton from '../../CustomConnectButton'
import Title from './Title'
import Description from './Description'
import { useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from '@components/Navbar'

const ConnectWalletPage = () => {
  const { data: account } = useAccount()
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
    <div className="bg-[url('/images/landing_background_mobile.png')] md:bg-[url('/images/landing_background.png')] bg-black bg-cover bg-center h-[100vh]">
      <Navbar />
      <div
        className={`pt-[75px] md:pt-[175px] flex text-white flex-col justify-center items-center gap-4 md:gap-11 md:gap-[50px] `}
      >
        <Title controls={titleControls} />
        <Description
          controls={descriptionControls}
          className="order-last md:order-none"
        />
        <CustomConnectButton
          controls={connectControls}
          className="order-first md:order-last"
        />
      </div>
    </div>
  )
}

export default ConnectWalletPage
