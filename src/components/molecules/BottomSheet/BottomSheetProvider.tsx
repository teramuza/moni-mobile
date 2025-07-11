import React, { createContext, useContext } from 'react';
import { DefaultRefObject } from '@type/base.ts';

interface IBSContext {
  refs: Record<string, DefaultRefObject>;
}

const BottomSheetContext = createContext<IBSContext | undefined>(undefined);

export const BottomSheetProvider: React.FC<{
  refs: Record<string, DefaultRefObject>;
  children: React.ReactNode;
}> = ({ refs, children }) => {
  return (
    <BottomSheetContext.Provider value={{ refs }}>
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheetRefs = (): IBSContext => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error(
      'useBottomSheetRefs must be used within a BottomSheetProvider',
    );
  }
  return context;
};
