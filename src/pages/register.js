import RegisterPage from '@/components/RegisterPage'
import NotLoggedInRequired from '@/components/loginAndAuth/NotLoggedInRequired'
import React from 'react'

const register = () => {
  return (
    <NotLoggedInRequired>
      <RegisterPage />
    </NotLoggedInRequired>
  )
}

export default register