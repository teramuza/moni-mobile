import {createContext, useContext} from 'react';
import GuardedToast, {
    GuardedToastRefObject,
} from '@components/molecules/Toast/GuardedToast.tsx';

interface IContext {
    ref: GuardedToastRefObject;
}

const ToastContext = createContext<IContext | undefined>(undefined);

const ToastProvider: React.FC<{
    ref: GuardedToastRefObject;
    children: React.ReactNode;
}> = ({ ref, children }) => {
    return (
        <ToastContext.Provider value={{ ref }}>
            <>
                {children}
                <GuardedToast ref={ref} />
            </>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    if (!context?.ref?.current) {
        throw new Error('Missing ref initialization');
    }
    return context.ref.current;
}

export default ToastProvider;
