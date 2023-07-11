import { motion } from 'framer-motion'

const Description = ({ controls }) => {
  const variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  }

  return (
    <motion.div
      className="flex flex-col gap-3"
      variants={variants}
      initial="hidden"
      animate={controls}
    >
      <motion.div className="font-body text-center">
        Turn any piece of music into a CD.
      </motion.div>
      <motion.div className="font-body text-center">
        CDs can own songs and interact with dApps
      </motion.div>
      <motion.div className="font-body text-center">
        across the Ethereum ecosystem.
      </motion.div>
    </motion.div>
  )
}

export default Description
