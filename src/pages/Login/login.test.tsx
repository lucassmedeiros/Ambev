import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { vi } from 'vitest'
import Login from '.'
import { SessionProvider } from '../../context/SessionContext'
import authApi from '../../services/authApi'


// Inicializa i18n
i18next.use(initReactI18next).init({
  lng: 'pt',
  resources: {
    pt: {
      translation: {
        errorLoggingCheckYourCredentials: 'Credenciais inválidas',
        loginSuccessful: 'Login realizado com sucesso',
        emailInvalid: 'E-mail inválido',
      },
    },
  },
})

// Mock do ToastContainer
vi.mock('react-toastify', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    ToastContainer: actual.ToastContainer,
    toast: {
      ...actual.toast,
      error: vi.fn(),
      success: vi.fn(),
    },
  }
})

// Mockando a API de autenticação
vi.mock('../../services/authApi', () => ({
  default: {
    get: vi.fn(),
  },
}))

// Mockando o useNavigate corretamente
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Função para renderizar a tela de login
const renderLogin = () => {
  return render(
    <MemoryRouter>
      <SessionProvider>
        <ToastContainer />
        <Login />
      </SessionProvider>
    </MemoryRouter>
  )
}

describe('Tela de Login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('Renderiza corretamente os campos de entrada', () => {
    renderLogin()

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /loginbutton/i })).toBeInTheDocument()
  })

  test('Exibe erro ao tentar logar com credenciais incorretas', async () => {
    authApi.get.mockRejectedValueOnce(new Error('Credenciais inválidas'))

    renderLogin()

    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'teste@teste.com' } })
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'senhaerrada' } })

    fireEvent.click(screen.getByRole('button', { name: /loginbutton/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Credenciais inválidas", expect.any(Object))
    })
  })

  test('Botão de login deve estar desabilitado quando os campos estão vazios', () => {
    renderLogin()
    const loginButton = screen.getByRole('button', { name: /loginbutton/i })
    expect(loginButton).toBeDisabled()
  })

  test('Exibe erro se o email for inválido', async () => {
    renderLogin()

    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'email-invalido' } })
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'senha123' } })
    fireEvent.click(screen.getByRole('button', { name: /loginbutton/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("E-mail inválido", expect.any(Object))
    })
  })

  test('Verifica se a senha está oculta por padrão', () => {
    renderLogin()
    const passwordInput = screen.getByPlaceholderText(/password/i)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('Verifica se há um link para recuperar senha', () => {
    renderLogin()
    expect(screen.getByText(/forgotpassword/i)).toBeInTheDocument()
  })

  test('Ativa o botão de login quando os campos são preenchidos corretamente', () => {
    renderLogin()

    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'user@teste.com' } })
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'senha123' } })

    const loginButton = screen.getByRole('button', { name: /loginbutton/i })
    expect(loginButton).not.toBeDisabled()
  })

  test('Permite login ao pressionar Enter no campo de senha', async () => {
    authApi.get.mockResolvedValueOnce({ data: [{ email: 'user@teste.com', password: 'senha123' }] })

    renderLogin()

    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'user@teste.com' } })
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'senha123' } })
    
    fireEvent.keyDown(screen.getByPlaceholderText(/password/i), { key: 'Enter', code: 'Enter' })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })
  })
})