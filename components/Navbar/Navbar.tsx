import Title from './Title'
import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import MobileMenu from './MobileMenu'
import useIsMobile from '@hooks/useIsMobile'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import CustomConnectButton from './CustomConnectButton'
import DesktopOptions from './DesktopOptions'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const titleControls = useAnimation()
  const menuControls = useAnimation()
  const { isMobile } = useIsMobile()

  useEffect(() => {
    const sequence = async () => {
      await titleControls.start('show')
      await menuControls.start('show')
    }
    sequence()
  }, [titleControls, menuControls])

  const handleMenuClick = async () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="flex justify-between items-center px-3 pt-3">
      <Title controls={titleControls} />
      {isMobile && (
        <motion.div
          onClick={handleMenuClick}
          whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
        >
          <Image src="/images/menu.svg" height={33} width={33} alt="menu" />
        </motion.div>
      )}

      {!isMobile && <DesktopOptions />}
      {!isMobile && <CustomConnectButton controls={menuControls} />}

      <MobileMenu isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default Navbar
