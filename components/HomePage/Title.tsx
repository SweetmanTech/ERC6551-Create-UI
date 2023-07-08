import { motion } from 'framer-motion'

const Title = ({ controls }) => {
  const variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25 }, // Change this value as needed
    },
  }

  return (
    <motion.div
      className="flex flex-col gap-3"
      variants={variants}
      initial="hidden"
      animate={controls}
    >
      <motion.div className="font-hanson text-5xl text-center">
        Create a CD with
      </motion.div>
      <motion.div className="font-hanson text-5xl text-center">
        your Music NFTs
      </motion.div>
    </motion.div>
  )
}

export default Title
