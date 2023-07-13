import { motion } from 'framer-motion'

const Description = ({ controls }) => {
  const variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  }

  return (
    <motion.div
      className="flex flex-col gap-1 text-white text-sm font-body text-center"
      variants={variants}
      initial="hidden"
      animate={controls}
    >
      <motion.div>Choose wisely.</motion.div>
      <motion.div>This piece will be the</motion.div>
      <motion.div>cover of your CD.</motion.div>
    </motion.div>
  )
}

export default Description
