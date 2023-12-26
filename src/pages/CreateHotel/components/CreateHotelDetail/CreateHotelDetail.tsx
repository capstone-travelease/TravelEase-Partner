import { Card, Divider, Form, Input, Select, TimePicker } from 'antd'

export default function CreateHotelDetail() {
    return (
        <Card>
            <h2>Hotel Detail</h2>
            <div className='text-gray-500'>Hotel detail information</div>
            <Form layout='vertical' className='mt-5'>
                <div className='flex'>
                    <div className='min-w-[25%]'>Hotel Name</div>
                    <Form.Item className='w-full'>
                        <Input size='large' />
                    </Form.Item>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[25%]'>Hotel Description</div>
                    <Form.Item className='w-full'>
                        <Input.TextArea size='large' />
                    </Form.Item>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[25%]'>Phone Number</div>
                    <Form.Item className='w-full'>
                        <Input size='large' />
                    </Form.Item>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[25%]'>Hotel Address</div>
                    <div className='w-full'>
                        <Form.Item label='Street Address' className='w-full'>
                            <Input size='large' />
                        </Form.Item>
                        <Form.Item label='City' className='w-full'>
                            <Select size='large' defaultValue='Ho Chi Minh' />
                        </Form.Item>
                        <Form.Item label='Country' className='w-full'>
                            <Select size='large' defaultValue='VietNam' />
                        </Form.Item>
                    </div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[25%]'>Time</div>
                    <div className='flex w-[50%] gap-10'>
                        <Form.Item label='Check-in Time' className='w-full'>
                            <TimePicker size='large' className='w-full' />
                        </Form.Item>
                        <Form.Item label='Check-out Time' className='w-full'>
                            <TimePicker size='large' className='w-full' />
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </Card>
    )
}
