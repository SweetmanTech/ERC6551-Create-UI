import { menuItems } from './menuItems'

const DesktopOptions = () => {
  return (
    <div className="text-white flex gap-10">
      {menuItems.map((navItem) => (
        <a key={navItem.title} href={navItem.link} target="_blank" rel="noreferrer">
          {navItem.title}
        </a>
      ))}
    </div>
  )
}

export default DesktopOptions
