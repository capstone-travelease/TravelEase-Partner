import { HotelDetailFormValue } from 'src/pages/CreateHotel/layouts/CreateHotelLayout/CreateHotelLayout'
import { Button, Card, Divider, Form, Input, Select } from 'antd'
import InputNumber from 'src/components/InputNumber'
import { CITIES_LIST } from 'src/constants/CityList'
import { useEffect } from 'react'

type PropsType = {
    onFinishHotelInfo?: (value: HotelDetailFormValue) => void
    hotelInfo?: HotelDetailFormValue
}

const option = Array(24)
    .fill(0)
    .map((_, index) => {
        return {
            value: `${index}:00`,
            label: `${index}:00`
        }
    })

export default function CreateHotelDetail({ onFinishHotelInfo, hotelInfo }: PropsType) {
    const [form] = Form.useForm<HotelDetailFormValue>()
    const cityList = CITIES_LIST.map((city) => {
        return {
            value: city.name,
            label: city.name
        }
    })

    useEffect(() => {
        if (hotelInfo) {
            form.setFieldsValue({
                hotelName: hotelInfo.hotelName,
                hotelDescription: hotelInfo.hotelDescription,
                hotelContactNumber: hotelInfo.hotelContactNumber,
                hotelEmail: hotelInfo.hotelEmail,
                hotelAddress: hotelInfo.hotelAddress,
                hotelCity: hotelInfo.hotelCity,
                hotelCounty: hotelInfo.hotelCounty,
                checkInTime: hotelInfo.checkInTime,
                checkOutTime: hotelInfo.checkOutTime
            })
        }
    }, [form, hotelInfo])

    return (
        <Form form={form} layout='vertical' onFinish={onFinishHotelInfo} requiredMark={false}>
            <Card>
                <h2>Hotel Information</h2>
                <div className='text-gray-500'>Hotel detail information</div>
                <div className='mt-5'>
                    <div className='flex'>
                        <div className='min-w-[25%]'>Hotel Name</div>
                        <Form.Item
                            name='hotelName'
                            className='w-full'
                            hasFeedback
                            rules={[{ required: true, message: 'Please enter hotel name' }]}
                        >
                            <Input size='large' placeholder='Enter hotel name' />
                        </Form.Item>
                    </div>
                    <Divider className='bg-gray-400' />
                    <div className='flex'>
                        <div className='min-w-[25%]'>Hotel Description</div>
                        <Form.Item
                            className='w-full'
                            hasFeedback
                            name='hotelDescription'
                            rules={[{ required: true, message: 'Please enter description' }]}
                        >
                            <Input.TextArea
                                showCount
                                maxLength={200}
                                autoSize={{ minRows: 2, maxRows: 6 }}
                                placeholder='Enter hotel description'
                            />
                        </Form.Item>
                    </div>
                    <Divider className='bg-gray-400' />
                    <div className='flex'>
                        <div className='min-w-[25%]'>Phone Number</div>
                        <Form.Item
                            className='w-full'
                            name='hotelContactNumber'
                            hasFeedback
                            rules={[
                                { required: true, message: 'Please enter hotel phone' },
                                {
                                    len: 10,
                                    message: 'Phone number must be 10 characters'
                                }
                            ]}
                        >
                            <InputNumber max={10} placeholder='Enter your phone' />
                        </Form.Item>
                    </div>
                    <Divider className='bg-gray-400' />
                    <div className='flex'>
                        <div className='min-w-[25%]'>Email Address</div>
                        <Form.Item
                            className='w-full'
                            hasFeedback
                            name='hotelEmail'
                            rules={[
                                { required: true, message: 'Please enter hotel email' },
                                { type: 'email', message: 'Please enter a valid email' }
                            ]}
                        >
                            <Input size='large' placeholder='Enter hotel email' />
                        </Form.Item>
                    </div>
                    <Divider className='bg-gray-400' />
                    <div className='flex'>
                        <div className='min-w-[25%]'>Hotel Address</div>
                        <div className='w-full'>
                            <Form.Item
                                label='Street Address'
                                name='hotelAddress'
                                className='w-full'
                                hasFeedback
                                rules={[{ required: true, message: 'Please enter hotel address' }]}
                            >
                                <Input size='large' placeholder='Enter hotel address' />
                            </Form.Item>
                            <Form.Item
                                label='City'
                                hasFeedback
                                name='hotelCity'
                                className='w-full'
                                initialValue='Thành phố Hồ Chí Minh'
                            >
                                <Select size='large' options={cityList} />
                            </Form.Item>
                            <Form.Item
                                label='Country'
                                hasFeedback
                                name='hotelCounty'
                                initialValue='Việt Nam'
                                className='w-full'
                            >
                                <Input disabled size='large' />
                            </Form.Item>
                        </div>
                    </div>
                    <Divider className='bg-gray-400' />
                    <div className='flex'>
                        <div className='min-w-[25%]'>Time</div>
                        <div className='flex flex-1 gap-20'>
                            <Form.Item label='Check-in Time' name='checkInTime' initialValue='12:00'>
                                <Select size='large' style={{ width: 120 }} options={option} />
                            </Form.Item>
                            <Form.Item label='Check-out Time' name='checkOutTime' initialValue='12:00'>
                                <Select size='large' style={{ width: 120 }} options={option} />
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
