import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from 'src/constants/Routes'
import ConfirmRegistration from './components/ConfirmRegister'
import IdentityVerification from './components/IdentityVerification'

export default function Register() {
    const [isRegister, setIsRegister] = useState(0)

    const handleRegister = () => {
        setIsRegister(1)
    }

    return (
        <div className='py-10 px-16 flex-1'>
            {isRegister === 0 && (
                <>
                    <div className='mb-1'>Start for free</div>
                    <h1 className='mb-5'>Sign Up to TravelEase</h1>
                    <Form requiredMark={false} layout='vertical' autoComplete='off' onFinish={handleRegister}>
                        <Form.Item hasFeedback label='Name' name='name' rules={[{ required: true }]}>
                            <Input
                                size='large'
                                placeholder='Enter your name'
                                className='border-2'
                                suffix={<UserOutlined />}
                            />
                        </Form.Item>
                        <Form.Item hasFeedback label='Email' name='email' rules={[{ required: true }]}>
                            <Input
                                size='large'
                                placeholder='Enter your email'
                                className='border-2'
                                suffix={<MailOutlined />}
                            />
                        </Form.Item>
                        <Form.Item hasFeedback label='Password' name='password' rules={[{ required: true }]}>
                            <Input.Password
                                size='large'
                                placeholder='Password'
                                className='border-2'
                                suffix={<LockOutlined />}
                            />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label='Confirm Password'
                            name='confirmPassword'
                            rules={[
                                { required: true },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            new Error('The confirm password that you entered do not match!')
                                        )
                                    }
                                })
                            ]}
                        >
                            <Input.Password
                                size='large'
                                placeholder='Enter your confirm password'
                                className='border-2'
                                suffix={<LockOutlined />}
                            />
                        </Form.Item>
                        <Button type='primary' block htmlType='submit' className='mt-3' size='large'>
                            Next step
                        </Button>
                    </Form>
                    <div className='mt-5 text-center'>
                        Already have an account?
                        <Link to={ROUTES.LOGIN} className='text-primary ml-2'>
                            Sign in
                        </Link>
                    </div>
                </>
            )}
            {isRegister === 1 && <IdentityVerification setIsRegister={setIsRegister} />}
            {isRegister === 2 && <ConfirmRegistration />}
        </div>
    )
}
