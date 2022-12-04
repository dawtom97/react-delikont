import React from 'react'
import { AuthForm } from '../src/components/AuthForm/AuthForm'
import { MainTemplate } from '../src/templates/MainTemplate'

const Auth = () => {
  return (
    <MainTemplate>
        <AuthForm/>
    </MainTemplate>
  )
}

export default Auth