import React, { FC } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';

interface LoadingComponentProps {
  inverted?: boolean; //darken or color the background
  content: string; //loading text
}

const LoadingComponent: FC<LoadingComponentProps> = ({ inverted = true, content = "Loading" }) => {
  return (
    <Dimmer active={true} inverted={inverted}>
        <Loader content={content}/>
    </Dimmer>
  )
}

export default LoadingComponent;