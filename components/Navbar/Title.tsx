import { motion } from 'framer-motion'

const Title = ({ controls }) => {
  const variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25 },
    },
  }

  return (
    <motion.div variants={variants} initial="hidden" animate={controls}>
      <motion.div className="font-hanson text-lg md:text-3xl text-center text-white">
        onchain cd
      </motion.div>
    </motion.div>
  )
}

export default Title
