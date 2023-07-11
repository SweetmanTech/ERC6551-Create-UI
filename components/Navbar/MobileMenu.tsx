import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

const menuItems = [
  { title: 'Your CDs', link: '/cds' },
  { title: 'About us', link: '/about' },
  { title: 'Support', link: '/support' },
  { title: 'Connect Wallet', link: '/wallet' },
]

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
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={closeMenu}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 w-full h-1/2 md:w-1/2 md:h-1/4 rounded-t-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => handleMenuItemClick(item.link)}
                className="my-2 text-white cursor-pointer hover:text-gray-300 transition duration-200"
              >
                {item.title}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
