import React, { useRef } from 'react';
import StatusBar from '@components/molecules/StatusBar';
import Header from './components/Header';
import SceneContainer from '@components/molecules/SceneContainer';
import Form from './components/Form';
import GuardedToast, {
    GuardedToastRefType,
    ToastDuration,
} from '@components/molecules/GuardedToast.tsx';

interface Props {}

const LoginScene: React.FC<Props> = () => {
    const toastRef = useRef<GuardedToastRefType>(null);

    const showToast = (message: string = '') => {
        toastRef.current?.showToast({
            message,
            duration: ToastDuration.short,
            containerStyle: {
                zIndex: 2,
            },
        });
    };
    return (
        <SceneContainer>
            <GuardedToast ref={toastRef} />
            <StatusBar barColor="bluePurplePlus2" />
            <Header />
            <Form showToast={showToast} />
        </SceneContainer>
    );
};

export default LoginScene;
