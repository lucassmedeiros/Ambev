import '@testing-library/jest-dom'
import { createContext } from 'react'

vi.mock('single-spa-react', async () => {
  return {
    SingleSpaContext: createContext({
      singleSpa: {
        pathToActiveWhen: (path: string) => (url: URL) => url.pathname === path
      }
    })
  }
})
