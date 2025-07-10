import React from 'react';
import StatusBar from '@components/molecules/StatusBar';
import Header from './components/Header';
import SceneContainer from '@components/molecules/SceneContainer';
import Form from './components/Form';

interface Props {}

const LoginScene: React.FC<Props> = () => {
  return (
    <SceneContainer>
      <StatusBar barColor="bluePurplePlus2" />
      <Header />
      <Form />
    </SceneContainer>
  );
};

export default LoginScene;
