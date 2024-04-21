import { Button, Card, Divider, Form, Input } from 'antd'
import { useEffect } from 'react'
import { HotelPolicyFormValue } from 'src/pages/CreateHotel/layouts/CreateHotelLayout/CreateHotelLayout'

type PropsType = {
    onFinishHotelPolicy?: (value: HotelPolicyFormValue) => void
    prev: () => void
    hotelPolicy?: HotelPolicyFormValue
}

export default function CreateHotelPolicy({ onFinishHotelPolicy, hotelPolicy, prev }: PropsType) {
    const [form] = Form.useForm<HotelPolicyFormValue>()
    useEffect(() => {
        if (hotelPolicy) {
            form.setFieldsValue(hotelPolicy)
        }
    }, [form, hotelPolicy])

    return (
        <Form form={form} layout='vertical' onFinish={onFinishHotelPolicy}>
            <Card>
                <h2>Hotel Policy</h2>
                <div className='text-gray-500'>Hotel regulations and policies</div>
                <div className='mt-5'>
                    <div className='flex'>
                        <div className='min-w-[25%] flex'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6 mr-2'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
                                />
                            </svg>
                            <div>Check-in policy</div>
                        </div>
                        <Form.Item
                            name='checkInPolicy'
                            className='w-full'
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your check-in policy!'
                                }
                            ]}
                        >
                            <Input.TextArea
                                size='large'
                                showCount
                                maxLength={160}
                                autoSize={{ minRows: 2, maxRows: 6 }}
                            />
                        </Form.Item>
                    </div>
                    <div className='flex mt-5'>
                        <div className='min-w-[25%] flex'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6 mr-2'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15'
                                />
                            </svg>
                            <div>Check-out policy</div>
                        </div>
                        <Form.Item
                            name='checkOutPolicy'
                            className='w-full'
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your check-out policy!'
                                }
                            ]}
                        >
                            <Input.TextArea
                                size='large'
                                showCount
                                maxLength={160}
                                autoSize={{ minRows: 2, maxRows: 6 }}
                            />
                        </Form.Item>
                    </div>
                    <Divider className='bg-gray-400' />
                    <div className='flex'>
                        <div className='min-w-[25%] flex'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6 mr-2'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
                                />
                            </svg>
                            Cancel reservation
                        </div>
                        <Form.Item
                            className='w-full'
                            name='cancellationPolicy'
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your cancellation policy!'
                                }
                            ]}
                        >
                            <Input.TextArea
                                size='large'
                                showCount
                                maxLength={160}
                                autoSize={{ minRows: 2, maxRows: 6 }}
                            />
                        </Form.Item>
                    </div>
                </div>
            </Card>
            <div className='mt-5 text-end'>
                <Button type='default' onClick={prev} htmlType='button' className='min-w-[150px] mr-5'>
                    Previous
                </Button>
                <Button type='primary' htmlType='submit' className='min-w-[150px]'>
                    Next
                </Button>
            </div>
        </Form>
    )
}
