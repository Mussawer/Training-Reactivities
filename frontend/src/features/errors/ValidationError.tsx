import React, { FC } from 'react'
import { Message } from 'semantic-ui-react';

interface ValidationErrorProps {
  errors: any;
}

const ValidationError: FC<ValidationErrorProps> = ({ errors }) => {
  return (
    <Message>
      {errors && (
        <Message.List>
          {
            errors.map((err: any, i: any) => (
              <Message.Item key={i}>{err}</Message.Item>
            ))
          }
        </Message.List>
      )}
    </Message>
  )
}

export default ValidationError;