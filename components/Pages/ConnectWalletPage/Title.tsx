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
    <motion.div
      className="flex flex-col gap-3 font-hanson text-md md:text-5xl text-center"
      variants={variants}
      initial="hidden"
      animate={controls}
    >
      <motion.div>Create a CD with</motion.div>
      <motion.div>your Music NFTs</motion.div>
    </motion.div>
  )
}

export default Title
