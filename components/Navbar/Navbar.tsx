import Title from './Title'
import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import MobileMenu from './MobileMenu'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const titleControls = useAnimation()
  const menuControls = useAnimation()

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
      <motion.div
        onClick={handleMenuClick}
        whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
      >
        <Image src="/images/menu.svg" height={33} width={33} alt="menu" />
      </motion.div>
      <MobileMenu isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default Navbar
