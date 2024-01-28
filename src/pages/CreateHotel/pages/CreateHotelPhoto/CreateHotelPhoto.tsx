import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Form, Modal, Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import { RcFile } from 'antd/es/upload'
import { useState } from 'react'

type PropsType = {
    onFinishHotelPhoto: (value: unknown) => void
    prev: () => void
}

type FileType = RcFile

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })

export default function CreateHotelPhoto({ onFinishHotelPhoto, prev }: PropsType) {
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg'
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://img.freepik.com/premium-photo/minsk-belarus-august-2017-columns-guestroom-hall-reception-modern-luxury-hotel_97694-6572.jpg'
        }
    ])

    const handleCancel = () => setPreviewOpen(false)

    const handlePreview = async (file: UploadFile) => {
        console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType)
        }

        setPreviewImage(file.url || (file.preview as string))
        setPreviewOpen(true)
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
    }

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        console.log(newFileList)
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
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 5 ? null : uploadButton}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt='example' style={{ width: '100%' }} src={previewImage} />
                    </Modal>
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
