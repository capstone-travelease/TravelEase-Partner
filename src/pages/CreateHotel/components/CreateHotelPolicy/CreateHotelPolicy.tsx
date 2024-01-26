import { Button, Card, Divider, Form, Input } from 'antd'

type PropsType = {
    onFinishHotelPolicy?: (value: unknown) => void
    prev: () => void
}

export default function CreateHotelPolicy({ onFinishHotelPolicy, prev }: PropsType) {
    return (
        <Form layout='vertical' onFinish={onFinishHotelPolicy}>
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
                        <Form.Item name='check_in_policy' className='w-full' hasFeedback rules={[{ required: true }]}>
                            <Input size='large' />
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
                        <Form.Item name='check_out_policy' className='w-full' hasFeedback rules={[{ required: true }]}>
                            <Input size='large' />
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
                        <Form.Item className='w-full'>
                            <Input.TextArea size='large' />
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
                                    d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z'
                                />
                            </svg>
                            Payment Policy
                        </div>
                        <Form.Item className='w-full'>
                            <Input.TextArea size='large' />
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
                                    d='M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
                                />
                            </svg>
                            Children and beds
                        </div>
                        <div className='w-full'>
                            <Form.Item label='Children' className='w-full'>
                                <Input.TextArea size='large' />
                            </Form.Item>
                            <Form.Item label='Beds' className='w-full'>
                                <Input.TextArea size='large' />
                            </Form.Item>
                        </div>
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
                                    d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                                />
                            </svg>
                            No age limit
                        </div>
                        <Form.Item className='w-full'>
                            <Input.TextArea size='large' />
                        </Form.Item>
                    </div>
                </div>
            </Card>
            <div className='mt-5 text-end'>
                <Button type='default' onClick={prev} htmlType='submit' className='min-w-[150px] mr-5'>
                    Previous
                </Button>
                <Button type='primary' htmlType='submit' className='min-w-[150px]'>
                    Next
                </Button>
            </div>
        </Form>
    )
}
