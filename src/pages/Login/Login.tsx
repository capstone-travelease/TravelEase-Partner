import { Button, Checkbox, Form, Input } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from 'src/constants/Routes'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { isAxiosUnauthorized } from 'src/utils/utils'

export default function Login() {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: authApi.login
    })

    const handleLogin = (data: { email: string; password: string }) => {
        loginMutation.mutate(data, {
            onSuccess: () => {
                navigate(ROUTES.DASHBOARD)
            },
            onError: (error) => {
                if (isAxiosUnauthorized(error)) {
                    form.setFields([
                        {
                            name: 'email',
                            errors: ['Email or password is incorrect']
                        }
                    ])
                }
            }
        })
    }
    return (
        <div className='py-14 px-16 flex-1'>
            <div className='mb-5'>Start for free</div>
            <h1 className='mb-5'>Sign In to TravelEase</h1>
            <Form form={form} requiredMark={false} layout='vertical' onFinish={handleLogin}>
                <Form.Item label='Email' name='email' rules={[{ required: true }, { type: 'email' }]}>
                    <Input size='large' placeholder='Enter your email' className='border-2' suffix={<MailOutlined />} />
                </Form.Item>
                <Form.Item label='Password' name='password' rules={[{ required: true }]}>
                    <Input.Password
                        size='large'
                        placeholder='Enter your password'
                        className='border-2'
                        suffix={<LockOutlined />}
                    />
                </Form.Item>
                <div className='flex justify-between mb-5'>
                    <Checkbox>Remember me</Checkbox>
                    <Link to={ROUTES.FORGOT_PASSWORD} className='text-primary font-medium'>
                        Forgot password?
                    </Link>
                </div>
                <Button type='primary' block htmlType='submit' size='large'>
                    Sign in
                </Button>
            </Form>
            <div className='mt-5'>
                Don’t have any account?
                <Link to={ROUTES.REGISTER} className='text-primary ml-2'>
                    Sign Up
                </Link>
            </div>
        </div>
    )
}
