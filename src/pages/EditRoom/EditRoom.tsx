import { UserOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Card, Divider, Form, Input, InputNumber, Select, Spin, Switch } from 'antd'
import { omit } from 'lodash'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import roomApi from 'src/apis/room.api'
import Facilities from 'src/components/Facilities'

export type RoomFormValues = {
    roomName: string
    roomPrice: number
    roomType: number
    roomQuantity: number
    roomDescription: string
    roomSize: string | number
    roomBedQuantity: number
    roomCapacity: number
    roomFacilites: number[]
    roomStatus: boolean
}

export default function EditRoom() {
    const { roomId, hotelId } = useParams()
    const [form] = Form.useForm<RoomFormValues>()
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const navigate = useNavigate()

    const { data, isLoading } = useQuery({
        queryKey: ['roomDetail', roomId],
        queryFn: () => roomApi.getRoomDetail(roomId as string)
    })

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                roomName: data.data.data.roomName,
                roomPrice: data.data.data.roomPrice,
                roomType: data.data.data.roomType,
                roomQuantity: data.data.data.roomQuantity,
                roomDescription: data.data.data.roomDescription,
                roomSize: Number(data.data.data.roomSize.replace('sqm', '')),
                roomBedQuantity: data.data.data.roomBedQuantity,
                roomCapacity: data.data.data.roomCapacity,
                roomFacilites: data.data.data.facilities,
                roomStatus: data.data.data.roomStatus
            })
        }
    }, [data, form])

    const updateRoomMutation = useMutation({
        mutationFn: roomApi.updateRoom
    })

    const roomTypesQuery = useQuery({
        queryKey: ['roomTypes'],
        queryFn: roomApi.getRoomType
    })

    const roomTypesOption = roomTypesQuery.data?.data.list.map((roomType) => ({
        value: roomType.room_type_id,
        label: roomType.room_type_name
    }))

    const handleSubmit = async (values: RoomFormValues) => {
        try {
            setLoadingUpdate(true)
            const body = omit(
                {
                    ...values,
                    roomId: Number(roomId),
                    facilities: values.roomFacilites,
                    roomSize: values.roomSize.toString()
                },
                'roomFacilites'
            )
            console.log(body)
            await updateRoomMutation.mutateAsync(body)
            toast.success('Update room successfully')
            navigate(`/hotel/${hotelId}/room-management`)
        } catch (error) {
            console.log(error)
            toast.error('Update room failed')
        } finally {
            setLoadingUpdate(false)
        }
    }

    return (
        <div>
            <Form form={form} layout='vertical' requiredMark={false} onFinish={handleSubmit}>
                <Spin spinning={isLoading} fullscreen />
                <Spin spinning={loadingUpdate} fullscreen />
                <div className='p-7 pb-0 flex flex-col gap-5'>
                    <Card>
                        <h2>Room Photo</h2>
                        <div className='text-gray-500'>Upload some images for your room</div>
                        <div className='mt-5'>
                            {/* <Form.Item
                                name='photo'
                                valuePropName='fileList'
                                getValueFromEvent={(event) => {
                                    return event.fileList
                                }}
                                rules={[{ required: true, message: 'Please upload least 1 image' }]}
                            >
                                <Upload
                                    // action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
                                    listType='picture-card'
                                    fileList={fileList}
                                    accept='.jpg,.jpeg,.png'
                                    maxCount={5}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    customRequest={({ onSuccess }) => {
                                        if (onSuccess) {
                                            onSuccess('ok')
                                        }
                                    }}
                                    beforeUpload={(file) => {
                                        if (file.size < 2097152 && file.type.includes('image')) {
                                            return true
                                        }
                                        message.error('File size limit is 2 MB and only accept image file type')
                                        return Upload.LIST_IGNORE
                                    }}
                                >
                                    {fileList.length >= 5 ? null : uploadButton}
                                </Upload>
                            </Form.Item>
                            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                <img alt='example' style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                            <div className='flex'>
                                <div className='text-red-500 mr-2'>*Note: </div>
                                Maximum 5 photos and file size limit is 2 MB
                            </div> */}
                        </div>
                    </Card>
                    <Card className='flex-grow'>
                        <h2>Room Detail</h2>
                        <div className='text-gray-500'>Room detail information</div>
                        <div className='mt-5'>
                            <div className='flex'>
                                <div className='min-w-[25%]'>Room Name</div>
                                <Form.Item
                                    name='roomName'
                                    className='w-full'
                                    hasFeedback
                                    rules={[{ required: true, message: 'Please enter room name' }]}
                                >
                                    <Input size='large' placeholder='Enter room name' />
                                </Form.Item>
                            </div>
                            <Divider className='bg-gray-400' />
                            <div className='flex'>
                                <div className='min-w-[25%]'>Room Description</div>
                                <Form.Item
                                    className='w-full'
                                    hasFeedback
                                    name='roomDescription'
                                    rules={[{ required: true, message: 'Please enter description' }]}
                                >
                                    <Input.TextArea
                                        showCount
                                        maxLength={200}
                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                        placeholder='Enter room description'
                                    />
                                </Form.Item>
                            </div>
                            <Divider className='bg-gray-400' />
                            <div className='flex'>
                                <div className='min-w-[25%]'>Room</div>
                                <div className='flex flex-col gap-2 w-full'>
                                    <div className='flex gap-7 w-full justify-between'>
                                        <Form.Item
                                            className='w-full'
                                            name='roomPrice'
                                            hasFeedback
                                            label='Room Price'
                                            initialValue={100000}
                                            rules={[{ required: true, message: 'Please enter room price ' }]}
                                        >
                                            <InputNumber<number>
                                                className='w-full'
                                                size='large'
                                                controls={false}
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={(value) => value?.replace(/(,*)/g, '') as unknown as number}
                                                addonAfter='VNĐ'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            className='w-full'
                                            hasFeedback
                                            name='roomQuantity'
                                            label='Room Quantity'
                                            rules={[
                                                {
                                                    required: true,
                                                    type: 'integer',
                                                    min: 1,
                                                    max: 100
                                                }
                                            ]}
                                        >
                                            <InputNumber<number>
                                                placeholder='Enter room quantity'
                                                className='w-full'
                                                size='large'
                                                controls={false}
                                                addonAfter='Room'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            className='w-full'
                                            hasFeedback
                                            label='Room Bed Quantity'
                                            name='roomBedQuantity'
                                            rules={[
                                                {
                                                    required: true,
                                                    type: 'integer',
                                                    min: 1,
                                                    max: 10
                                                }
                                            ]}
                                        >
                                            <InputNumber<number>
                                                placeholder='Enter room bed quantity'
                                                className='w-full'
                                                size='large'
                                                controls={false}
                                                addonAfter={'Bed'}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className='flex gap-7 w-full justify-between'>
                                        <Form.Item
                                            className='w-full'
                                            hasFeedback
                                            label='Room Capacity'
                                            name='roomCapacity'
                                            rules={[
                                                {
                                                    required: true,
                                                    type: 'integer',
                                                    min: 1,
                                                    max: 50
                                                }
                                            ]}
                                        >
                                            <InputNumber<number>
                                                placeholder='Enter room capicity'
                                                className='w-full'
                                                size='large'
                                                controls={false}
                                                addonAfter={<UserOutlined />}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label='Room Size'
                                            name='roomSize'
                                            hasFeedback
                                            className='w-full'
                                            initialValue={1}
                                            rules={[
                                                {
                                                    required: true,
                                                    type: 'number',
                                                    min: 1,
                                                    max: 200
                                                }
                                            ]}
                                        >
                                            <InputNumber<number>
                                                className='w-full'
                                                placeholder='Enter room size'
                                                size='large'
                                                addonAfter='m²'
                                                controls={false}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <Divider className='bg-gray-400' />
                            <div className='flex'>
                                <div className='min-w-[25%]'>Room Type</div>
                                <Form.Item
                                    name='roomType'
                                    className='w-full'
                                    rules={[{ required: true, message: 'Please select room type' }]}
                                >
                                    <Select
                                        placeholder='Select room type'
                                        className='w-full'
                                        size='large'
                                        options={roomTypesOption}
                                    />
                                </Form.Item>
                            </div>
                            <Divider className='bg-gray-400' />
                            <div className='flex'>
                                <div className='min-w-[25%]'>Room Status</div>
                                <Form.Item name='roomStatus' valuePropName='checked'>
                                    <Switch checkedChildren='Active' unCheckedChildren='Close' />
                                </Form.Item>
                            </div>
                            <Divider className='bg-gray-400' />
                            <div className='flex'>
                                <div className='min-w-[25%]'>Facility</div>
                                <Form.Item
                                    name='roomFacilites'
                                    valuePropName='value'
                                    rules={[
                                        {
                                            required: true,
                                            type: 'array',
                                            min: 1,
                                            message: 'Please select at least 1 facility'
                                        }
                                    ]}
                                >
                                    <Facilities />
                                </Form.Item>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='mt-10 text-end sticky bottom-0 border-t border-solid shadow border-gray-200 z-10 w-full bg-white px-7 py-3'>
                    <Link to={`/hotel/${hotelId}/room-management`}>
                        <Button type='default' className='mr-5' htmlType='button'>
                            Cancel
                        </Button>
                    </Link>
                    <Button type='primary' htmlType='submit'>
                        Update Room
                    </Button>
                </div>
            </Form>
        </div>
    )
}
