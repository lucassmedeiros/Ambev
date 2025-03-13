import { createContext, useCallback, useContext, useState } from 'react';



export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
  refreshToken: string;
}

interface SessionContextProps {
  handleLogout: () => void
  handleSetUserData: (newUserData: UserData) => void
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
}

const SessionContext = createContext<SessionContextProps>(
  {} as SessionContextProps,
)

const SessionProvider = ({ children }: { children: React.ReactNode }) => {

  const [token, setToken] = useState(() => {
    const initialToken = sessionStorage.getItem('@token')
    console.log('initialToken', initialToken)
    if (initialToken) {
      return initialToken
    } else {
      return ''
    }
  })

  const handleSetUserData = useCallback((data: any | null) => {
    setToken(data[0].token)
    sessionStorage.setItem('@user-data', JSON.stringify(data))
    sessionStorage.setItem('@token', data[0].token)
  }, [])


  const handleLogout = () => {
    sessionStorage.removeItem('@token');
    sessionStorage.removeItem('@user-data');
    setToken('')
  };

  return (
    <SessionContext.Provider
      value={{
        handleSetUserData,
        token,
        setToken,
        handleLogout
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

function useSession(): SessionContextProps {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}

export { useSession, SessionProvider };

