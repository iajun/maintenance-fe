import { AuthPage } from '@refinedev/antd'

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: { email: 'iveoname@gmail.com', password: 'helloworld' },
      }}
    />
  )
}
