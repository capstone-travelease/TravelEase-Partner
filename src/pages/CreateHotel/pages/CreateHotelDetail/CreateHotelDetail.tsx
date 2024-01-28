import { Button, Card, Divider, Form, Input, Select, TimePicker } from 'antd'
import { CITIES_LIST } from 'src/constants/CityList'

type PropsType = {
    onFinishHotelInfo?: (value: unknown) => void
}

export default function CreateHotelDetail({ onFinishHotelInfo }: PropsType) {
    const cityList = CITIES_LIST.map((city) => {
        return {
            value: city.name,
            label: city.name
        }
    })

    return (
        <Form layout='vertical' onFinish={onFinishHotelInfo}>
            <Card>
                <h2>Hotel Information</h2>
                <div className='text-gray-500'>Hotel detail information</div>
                <div className='mt-5'>
                    <div className='flex'>
                        <div className='min-w-[25%]'>Hotel Name</div>
                        <Form.Item name='hotel_name' className='w-full' hasFeedback>
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
                        <div className='min-w-[25%]'>Email Address</div>
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
                                <Select size='large' defaultValue='Thành phố Hà Nội' options={cityList} />
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
                </div>
            </Card>
            <div className='mt-5 text-end'>
                <Button type='primary' htmlType='submit' className='min-w-[150px]'>
                    Next
                </Button>
            </div>
        </Form>
    )
}
