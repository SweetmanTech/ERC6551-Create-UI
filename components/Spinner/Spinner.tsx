import Image from 'next/image'

const Spinner = ({ size = 50 }) => (
  <Image
    className="h-5 w-5 text-green-600"
    src="/images/spinner.gif"
    alt="Spinner"
    width={size}
    height={size}
  />
)

export default Spinner
