import React, { createContext, useContext, useState, ReactNode } from 'react';

interface APIContextType {
  state: {
    sharedData: any;
    anotherState: string;
  };
  setState: React.Dispatch<React.SetStateAction<APIContextType['state']>>;
}

const APIContext = createContext<APIContextType | undefined>(undefined);

export const APIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<APIContextType['state']>({
    sharedData: null,
    anotherState: 'default',
  });

  return (
    <APIContext.Provider value={{ state, setState }}>
      {children}
    </APIContext.Provider>
  );
};

export const useAPIContext = (): APIContextType => {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error('useAPIContext must be used within an APIProvider');
  }
  return context;
};
