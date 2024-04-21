import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Form, Modal, Upload, message } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import { RcFile } from 'antd/es/upload'
import { useEffect, useState } from 'react'

type PropsType = {
    onFinishHotelPhoto: (value: RcFile[]) => void
    prev: () => void
    setHotelPhoto: React.Dispatch<React.SetStateAction<RcFile[] | undefined>>
}

export default function CreateHotelPhoto({ onFinishHotelPhoto, prev, setHotelPhoto }: PropsType) {
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState<UploadFile[]>([])

    useEffect(() => {
        setHotelPhoto(undefined)
    }, [setHotelPhoto])

    const handlePreview = async (file: UploadFile) => {
        if (file) {
            const urlImage = URL.createObjectURL(file.originFileObj as File)
            setPreviewImage(urlImage)
        }
        setPreviewOpen(true)
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
    }

    const handleCancel = () => {
        setPreviewOpen(false)
        setPreviewImage('')
    }

    const handleChange: UploadProps['onChange'] = ({ fileList }) => {
        const newFileList = fileList.filter((file) => file.status === 'done')
        setFileList(newFileList)
    }

    const handleUpload = () => {
        const files = fileList.map((file) => file.originFileObj)
        onFinishHotelPhoto(files as RcFile[])
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type='button'>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    )

    return (
        <Form layout='vertical' onFinish={handleUpload}>
            <Card>
                <h2>Hotel Photo</h2>
                <div className='flex flex-col gap-4'>
                    <div className='text-gray-500'>Upload some images for your hotel</div>
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
