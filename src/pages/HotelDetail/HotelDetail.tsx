import { Button, Card, Checkbox, Col, Divider, Form, Input, Modal, Row, Select, Spin, Upload, message } from 'antd'
import { useEffect, useState } from 'react'
import { CITIES_LIST } from 'src/constants/CityList'
import type { UploadFile, UploadProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import hotelApi from 'src/apis/hotel.api'
import InputNumber from 'src/components/InputNumber'
import facilitiesApi from 'src/apis/facilities.api'
import { URL_IMAGE } from 'src/constants/AppConstants'
import { omit } from 'lodash'
import { toast } from 'react-toastify'

const option = Array(24)
    .fill(0)
    .map((_, index) => {
        return {
            value: `${index}:00`,
            label: `${index}:00`
        }
    })
const cityList = CITIES_LIST.map((city) => {
    return {
        value: city.name,
        label: city.name
    }
})

type HotelDetailFormValue = {
    hotelName: string
    hotelAddress: string
    hotelCity: string
    hotelCountry: string
    hotelContactNumber: string
    hotelEmail: string
    hotelDescription: string
    checkInTime: string
    checkOutTime: string
    cancellationPolicy: string
    checkInPolicy: string
    checkOutPolicy: string
    facilities: number[]
    photo: UploadFile[]
}
const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </button>
)

export default function HotelDetail() {
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [form] = Form.useForm<HotelDetailFormValue>()
    const { hotelId } = useParams()
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['getDetailHotel', hotelId],
        queryFn: () => hotelApi.getDetailHotel(hotelId as string)
    })

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                hotelName: data.data.data.hotelName,
                hotelAddress: data.data.data.hotelAddress,
                hotelCity: data.data.data.hotelCity,
                hotelCountry: data.data.data.hotelCountry,
                hotelContactNumber: data.data.data.hotelNumber,
                hotelEmail: data.data.data.hotelEmail,
                hotelDescription: data.data.data.hotelDescription,
                checkInTime: data.data.data.hotelCheckIn,
                checkOutTime: data.data.data.hotelCheckOut,
                facilities: data.data.data.hotelFacility,
                photo: data.data.data.hotelImage.map((url) => {
                    return {
                        uid: `${url} + ${Math.random()}`,
                        name: url.substring(url.lastIndexOf('/') + 1),
                        status: 'done',
                        url: `${URL_IMAGE}/${url}`
                    }
                })
            })
        }
    }, [data, form])

    const getFacilityQuery = useQuery({
        queryKey: ['facilities'],
        queryFn: facilitiesApi.getFacilities,
        staleTime: 1000 * 60
    })

    const updateHotelMutation = useMutation({
        mutationFn: hotelApi.updateHotel
    })

    const updateImageMutation = useMutation({
        mutationFn: hotelApi.updateImage
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

    const onFinish = async (values: HotelDetailFormValue) => {
        try {
            const hotelData = omit(values, 'photo')
            setIsLoadingUpdate(true)
            await updateHotelMutation.mutateAsync({ hotelId: hotelId as string, body: hotelData })
            const newPhotoData = values.photo.filter((file) => file.originFileObj as File)
            const urlPath = values.photo
                .filter((file) => file.url)
                .map((item) => item.url?.replace(`${URL_IMAGE}/`, ''))

            if (newPhotoData.length > 0 || urlPath.length !== data?.data.data.hotelImage.length) {
                const form = new FormData()
                newPhotoData.length > 0 &&
                    newPhotoData.forEach((file) => {
                        form.append('image', file.originFileObj as File)
                    })
                form.append('data', new Blob([JSON.stringify(urlPath)], { type: 'application/json' }))
                await updateImageMutation.mutateAsync({ hotelId: Number(hotelId), formData: form })
            }
            toast.success('Update hotel successfully')
            refetch()
        } catch (error) {
            console.log(error)
            toast.error('Update hotel failed')
        } finally {
            setIsLoadingUpdate(false)
        }
    }

    return (
        <Form form={form} className='relative' layout='vertical' requiredMark={false} onFinish={onFinish}>
            <Spin spinning={isLoadingUpdate} fullscreen size='large' />
            <Spin spinning={isLoading} fullscreen size='large' />
            <div className='flex flex-col gap-5 p-7 pb-0'>
                <Card>
                    <h2>Hotel Photo</h2>
                    <div className='text-gray-500'>Upload some images for your hotel</div>
                    <div className='mt-5'>
                        <Form.Item
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
                        </div>
                    </div>
                </Card>
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
                                    name='hotelCountry'
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
                        <Divider className='bg-gray-400' />
                        <div className='flex'>
                            <div className='min-w-[25%]'>Facility</div>
                            <div className='flex flex-1 gap-20'>
                                <Form.Item
                                    name='facilities'
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
                                    <Checkbox.Group style={{ width: '100%' }}>
                                        {getFacilityQuery.data?.data.list.map((facility, index) => (
                                            <div key={index} className='w-full'>
                                                <h3 className='w-full mt-5'>{facility.facilityType}</h3>
                                                <Row gutter={[10, 10]} align='middle'>
                                                    {facility.list.map((item) => (
                                                        <Col span={6} key={item.facilityId}>
                                                            <Checkbox value={item.facilityId}>
                                                                {item.facilityName}
                                                            </Checkbox>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </div>
                                        ))}
                                    </Checkbox.Group>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <div className='mt-10 text-end sticky bottom-0 border-t border-solid shadow border-gray-200 z-10 w-full bg-white px-7 py-3'>
                <Button type='primary' htmlType='submit' className='min-w-[150px]'>
                    Update
                </Button>
            </div>
        </Form>
    )
}
