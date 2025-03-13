import i18next from 'i18next'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSession } from '../../context/SessionContext'
import authApi from '../../services/authApi'
import * as S from './styles'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleSetUserData } = useSession()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      toast.error(i18next.t('emailInvalid') || 'E-mail inválido', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
      })
      return
    }

    try {
      const response = await authApi.get(
        `/users?email=${email}&password=${password}`,
      )
      handleSetUserData(response.data)

      console.log('asdasd', response.data.length, response.data)
      if (response.data.length) {
        toast.success(i18next.t('loginSuccessful').toString(), {
          position: 'top-right',
          autoClose: 3000,
          theme: 'light',
        })
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error(i18next.t('errorLoggingCheckYourCredentials') || 'Erro ao fazer login', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
      })
    }
  }

  return (
    <S.Container>
      <S.LeftSide>
        <S.LoginCard>
          <h2>{t('loginTitle')}</h2>
          <p>{t('welcomeMessage')}</p>
          <S.Input
            type="email"
            placeholder={t('emailLabel')}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <S.Input
            type="password"
            placeholder={t('password')}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
           
          />
          <S.Button 
            onClick={handleLogin} 
            disabled={!email || !password} 
          >
            {t('enter')}
          </S.Button>
          <S.ForgotPassword>{t('forgotPassword')}</S.ForgotPassword>
        </S.LoginCard>
      </S.LeftSide>
      <S.RightSide />
    </S.Container>
  )
}

export default Login
