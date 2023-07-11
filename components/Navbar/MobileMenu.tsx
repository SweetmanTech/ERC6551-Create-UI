import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { menuItems } from './menuItems'
import CustomConnectButton from './CustomConnectButton'

const MobileMenu = ({ isOpen, closeMenu }) => {
  const router = useRouter()

  const handleMenuItemClick = (link) => {
    router.push(link)
    closeMenu()
  }

  return (
    // @ts-ignore
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={closeMenu}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-r from-[#484848] via-[#484848] to-black-500 flex flex-col justify-end items-center pb-5 w-full h-[200px] md:w-1/2 md:h-1/4 rounded-t-3xl border-t border-l border-r border-white"
            onClick={(e) => e.stopPropagation()}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => handleMenuItemClick(item.link)}
                className="my-2 text-white text-center cursor-pointer hover:text-gray-300 transition duration-200"
              >
                {item.title}
              </motion.div>
            ))}
            <div className="pt-3">
              <CustomConnectButton />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
