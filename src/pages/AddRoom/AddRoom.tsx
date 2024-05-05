import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
    Button,
    Card,
    Divider,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
    Spin,
    Upload,
    UploadFile,
    UploadProps,
    message
} from 'antd'
import { omit } from 'lodash'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import roomApi from 'src/apis/room.api'
import Facilities from 'src/components/Facilities'

export type AddRoomFormValues = {
    roomName: string
    roomPrice: number
    roomType: number
    roomQuantity: number
    roomDescription: string
    roomSize: string
    roomBedQuantity: number
    roomCapacity: number
    roomFacilites: number[]
    roomPhoto: UploadFile[]
}

const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </button>
)

export default function AddRoom() {
    const { hotelId } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const roomTypesQuery = useQuery({
        queryKey: ['roomTypes'],
        queryFn: roomApi.getRoomType
    })
    const roomTypesOption = roomTypesQuery.data?.data.list.map((roomType) => ({
        value: roomType.room_type_id,
        label: roomType.room_type_name
    }))

    const addRoomMutation = useMutation({
        mutationFn: roomApi.addRoom
    })

    const uploadRoomImageMutation = useMutation({
        mutationFn: roomApi.uploadRoomImage
    })

    const handlePreview = async (file: UploadFile) => {
        const urlImage = file.url ? file.url : URL.createObjectURL(file.originFileObj as File)
        setPreviewImage(urlImage)
        setPreviewOpen(true)
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
    }
    const handleCancel = () => setPreviewOpen(false)

    const handleChange: UploadProps['onChange'] = ({ fileList }) => {
        const newFileList = fileList.filter((file) => file.status === 'done')
        setFileList(newFileList)
    }

    const handleSubmit = async (values: AddRoomFormValues) => {
        try {
            if (!hotelId) throw new Error()
            const hotelBody = omit(
                {
                    ...values,
                    hotelId: Number(hotelId),
                    roomSize: values.roomSize.toString()
                },
                'roomPhoto'
            )
            setIsLoading(true)
            const res = await addRoomMutation.mutateAsync(hotelBody)
            const { roomId } = res.data
            const formData = new FormData()
            values.roomPhoto.forEach((file) => {
                console.log('file', file)
                formData.append('images', file.originFileObj as File)
            })
            await uploadRoomImageMutation.mutateAsync({ roomId, formData })
            toast.success('Create room successfully')
            navigate(`/hotel/${hotelId}/room-management`)
        } catch (error) {
            toast.error('Create room failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Form layout='vertical' requiredMark={false} onFinish={handleSubmit}>
                <Spin spinning={isLoading} fullscreen />
                <div className='p-7 pb-0 flex flex-col gap-5'>
                    <Card>
                        <h2>Room Photo</h2>
                        <div className='text-gray-500'>Upload some images for your room</div>
                        <div className='mt-5'>
                            <Form.Item
                                name='roomPhoto'
                                valuePropName='fileList'
                                getValueFromEvent={(event) => {
                                    return event.fileList
                                }}
                                rules={[{ required: true, message: 'Please upload least 1 image' }]}
                            >
                                <Upload
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
                            </div>
                        </div>
                    </Card>
                    <Card className='flex-grow'>
                        <h2>Create room</h2>
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
                    <Button type='primary' htmlType='submit'>
                        Create Room
                    </Button>
                </div>
            </Form>
        </div>
    )
}
