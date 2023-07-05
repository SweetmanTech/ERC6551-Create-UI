import { Button, Spinner } from 'degen'
import { useState } from 'react'
import { useCreateDrop } from '@providers/CreateDropProvider'

const CreateDropButton = () => {
  const { createDrop } = useCreateDrop()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    await createDrop()
    setLoading(false)
  }

  return (
    <Button width="full" disabled={loading} onClick={handleClick}>
      {loading ? <Spinner /> : 'Create Drop'}
    </Button>
  )
}

export default CreateDropButton
