import React, { FC } from 'react'

interface ValidationErrorProps {
  erros: string[]
}

const ValidationError: FC<ValidationErrorProps> = ({  }) => {
  return (
    <div>
     ValidationError
    </div>
  )
}

export default ValidationError;