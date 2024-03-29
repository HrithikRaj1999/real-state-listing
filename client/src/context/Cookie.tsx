import React, { createContext, useEffect, useState } from "react";
import useCookie from "../hooks/useCookie"; // update the import path accordingly
const CookieContext = createContext<CookieContextProps | undefined>(undefined);

export const CookieProvider: React.FC<CookieProviderProps> = ({ children }) => {
  const [isCookieChecked, setIsCookieChecked] = useState(false);
  const { checkCookieExists } = useCookie();
  useEffect(() => {
    if (!isCookieChecked) {
      checkCookieExists();
      setIsCookieChecked(true);
    }
  }, [isCookieChecked, checkCookieExists]);

  return (
    <CookieContext.Provider value={{ isCookieChecked }}>
      {children}
    </CookieContext.Provider>
  );
};
