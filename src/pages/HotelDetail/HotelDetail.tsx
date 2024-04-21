import {
    Button,
    Card,
    Checkbox,
    Col,
    Divider,
    Form,
    Input,
    Modal,
    Row,
    Select,
    TimePicker,
    Upload,
    message
} from 'antd'
import { useState } from 'react'
import { CITIES_LIST } from 'src/constants/CityList'
import type { UploadFile, UploadProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export default function HotelDetail() {
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [form] = Form.useForm()

    const handleCancel = () => setPreviewOpen(false)

    const handlePreview = async (file: UploadFile) => {
        if (file) {
            const urlImage = URL.createObjectURL(file.originFileObj as File)
            setPreviewImage(urlImage)
        }
        setPreviewOpen(true)
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
    }

    const handleChange: UploadProps['onChange'] = ({ fileList }) => {
        const newFileList = fileList.filter((file) => file.status === 'done')
        setFileList(newFileList)
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type='button'>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    )

    const cityList = CITIES_LIST.map((city) => {
        return {
            value: city.name,
            label: city.name
        }
    })

    return (
        <Form form={form} className='p-7' layout='vertical' onFinish={() => {}}>
            <div className='flex gap-5'>
                <Card className='w-[60%]'>
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
                <div className='w-[40%] flex flex-col gap-5'>
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
                        <h2>Hotel Facilities</h2>
                        <div className='text-gray-500'>Hotel facilities information</div>
                        <div className='mt-5'>
                            <Checkbox.Group style={{ width: '100%' }}>
                                <Row gutter={[0, 10]}>
                                    <Col span={8}>
                                        <Checkbox value='A'>Playround</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value='B'>Play</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value='C'>Fitness</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value='D'>Gym</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value='E'>Central</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value='F'>Vincom</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value='J'>Vincom</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value='K'>Vincom</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value='Y'>Vincom</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </div>
                    </Card>
                </div>
            </div>
            <div className='mt-5 text-end'>
                <Button type='primary' htmlType='submit' className='min-w-[150px]'>
                    Save
                </Button>
            </div>
        </Form>
    )
}
