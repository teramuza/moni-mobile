import React from 'react';
import StatusBar from '@components/molecules/StatusBar';
import Header from './components/Header';
import SceneContainer from '@components/molecules/SceneContainer';
import Form from './components/Form';
import { useToast } from '@components/molecules/Toast/ToastProvider.tsx';

interface Props {}

const LoginScene: React.FC<Props> = () => {
    const toastRef = useToast();

    const showToast = (message: string = '') => {
        toastRef?.showToast({
            message,
            containerStyle: {
                zIndex: 2,
            },
        });
    };
    return (
        <SceneContainer>
            <StatusBar barColor="bluePurplePlus2" />
            <Header />
            <Form showToast={showToast} />
        </SceneContainer>
    );
};

export default LoginScene;
