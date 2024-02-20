import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Form, Modal, Upload, message } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import { useState } from 'react'

type PropsType = {
    onFinishHotelPhoto: (value: unknown) => void
    prev: () => void
}

export default function CreateHotelPhoto({ onFinishHotelPhoto, prev }: PropsType) {
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const handleCancel = () => setPreviewOpen(false)

    const handlePreview = async (file: UploadFile) => {
        if (file) {
            const urlImage = URL.createObjectURL(file.originFileObj as File)
            setPreviewImage(urlImage)
        }
        setPreviewOpen(true)
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
    }

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type='button'>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    )

    return (
        <Form layout='vertical' onFinish={onFinishHotelPhoto}>
            <Card>
                <h2>Hotel Photo</h2>
                <div className='text-gray-500'>Upload some images for your hotel</div>
                <div className='mt-5'>
                    <Upload
                        action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
                        listType='picture-card'
                        fileList={fileList}
                        maxCount={5}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        beforeUpload={(file) => {
                            const isCheckSize = file.size > 2097152
                            if (isCheckSize) {
                                message.error('File size limit is 2 MB')
                            }
                            return !isCheckSize || Upload.LIST_IGNORE
                        }}
                    >
                        {fileList.length >= 5 ? null : uploadButton}
                    </Upload>
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
