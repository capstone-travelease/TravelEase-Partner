import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Radio } from 'antd'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from 'src/constants/Routes'
import dayjs from 'dayjs'
import { RegisterFormType } from 'src/types/auth.type'
import { omit } from 'lodash'
import IdentityVerification from 'src/pages/Register/components/IdentityVerification'
import InputNumberCustom from 'src/components/InputNumberCustom'
dayjs.extend(customParseFormat)

export default function Register() {
    const [isRegister, setIsRegister] = useState(false)
    const [data, setData] = useState<Omit<RegisterFormType, 'confirmPassword'>>()

    const handleRegister = (data: RegisterFormType) => {
        const body = omit({ ...data, birthday: dayjs(data.birthday).format('YYYY-MM-DD') }, 'confirmPassword')
        setData(body)
        setIsRegister(true)
    }

    return (
        <div className='py-10 px-16 flex-1'>
            {isRegister === false && (
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
                        <Form.Item
                            hasFeedback
                            label='Email'
                            name='email'
                            rules={[{ required: true }, { type: 'email' }]}
                        >
                            <Input
                                size='large'
                                placeholder='Enter your email'
                                className='border-2'
                                suffix={<MailOutlined />}
                            />
                        </Form.Item>
                        <Form.Item
                            className='w-full'
                            label='Phone'
                            name='phonenumber'
                            hasFeedback
                            rules={[
                                { required: true, message: 'Please enter hotel phone' },
                                {
                                    len: 10,
                                    message: 'Phone number must be 10 characters'
                                }
                            ]}
                        >
                            <InputNumberCustom className='border-2' max={10} placeholder='Enter your phone' />
                        </Form.Item>
                        <div className='flex  gap-4'>
                            <Form.Item
                                className='w-full'
                                hasFeedback
                                label='Gender'
                                name='gender'
                                initialValue={true}
                                rules={[{ required: true }]}
                            >
                                <Radio.Group buttonStyle='solid'>
                                    <Radio.Button value={true}>Male</Radio.Button>
                                    <Radio.Button value={false}>Female</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                className='w-full'
                                hasFeedback
                                label='Birthday'
                                name='birthday'
                                rules={[
                                    { required: true },
                                    () => ({
                                        validator(_, value) {
                                            if (!value || new Date(value) < new Date()) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(
                                                new Error('The birthday that you entered is invalid!')
                                            )
                                        }
                                    })
                                ]}
                            >
                                <DatePicker className='w-full' />
                            </Form.Item>
                        </div>
                        <Form.Item
                            hasFeedback
                            label='Password'
                            name='password'
                            rules={[{ required: true }, { min: 6 }]}
                        >
                            <Input.Password
                                size='large'
                                placeholder='Password'
                                className='border-2'
                                suffix={<LockOutlined />}
                            />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label='Re-type Password'
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
            {isRegister === true && (
                <IdentityVerification setIsRegister={setIsRegister} setData={setData} data={data} />
            )}
        </div>
    )
}
