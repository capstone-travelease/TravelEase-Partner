import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Form, Modal, Upload, message } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import { useMemo, useState } from 'react'
import { RcFile } from 'antd/es/upload'

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

    const [files, setFile] = useState<{
        imageFront: File | undefined
        imageBack: File | undefined
    }>()

    const previewImageFront = useMemo(() => {
        return files?.imageFront ? URL.createObjectURL(files.imageFront) : ''
    }, [files])

    const previewImageBack = useMemo(() => {
        return files?.imageBack ? URL.createObjectURL(files.imageBack) : ''
    }, [files])

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
            <Card className='mt-5'>
                <div className='flex justify-between items-center gap-10'>
                    <Form.Item
                        name='id_front'
                        label='ID front'
                        className='w-full'
                        valuePropName='fileList'
                        getValueFromEvent={(event) => {
                            return event?.fileList
                        }}
                        rules={[
                            {
                                validator(_, fileList: RcFile[]) {
                                    console.log(fileList)
                                    return new Promise((resolve, rejects) => {
                                        if (fileList && fileList[0].size > 2097152) {
                                            rejects('File size limit is 2 MB')
                                        } else {
                                            resolve('Success')
                                        }
                                    })
                                }
                            },
                            { required: true }
                        ]}
                    >
                        <Upload
                            accept='.jpg,.gif,.png'
                            className='h-[250px] relative overflow-hidden border-2 cursor-pointer border-solid rounded border-gray-600 flex items-center justify-center text-center'
                            showUploadList={false}
                            maxCount={1}
                            customRequest={(option) => {
                                setFile((prev) => {
                                    return {
                                        imageFront: option.file as RcFile,
                                        imageBack: prev?.imageBack
                                    }
                                })
                            }}
                        >
                            {previewImageFront ? (
                                <img
                                    src={previewImageFront}
                                    alt=''
                                    className='w-full h-full absolute object-cover top-0 left-0'
                                />
                            ) : (
                                <div>
                                    <div>Add photo</div>
                                    <PlusCircleOutlined />
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name='id_back'
                        label='ID back'
                        className='w-full'
                        valuePropName='fileList'
                        getValueFromEvent={(event) => {
                            return event?.fileList
                        }}
                        rules={[
                            {
                                validator(_, fileList: RcFile[]) {
                                    return new Promise((resolve, rejects) => {
                                        if (fileList && fileList[0].size > 2097152) {
                                            rejects('File size limit is 2 MB')
                                        } else {
                                            resolve('Success')
                                        }
                                    })
                                }
                            },
                            { required: true }
                        ]}
                    >
                        <Upload
                            accept='.jpg,.gif,.png'
                            className='h-[250px] relative overflow-hidden border-2 cursor-pointer border-solid rounded border-gray-600 flex items-center justify-center text-center'
                            showUploadList={false}
                            maxCount={1}
                            customRequest={(option) => {
                                setFile((prev) => {
                                    return {
                                        imageFront: prev?.imageFront,
                                        imageBack: option.file as RcFile
                                    }
                                })
                            }}
                        >
                            {previewImageBack ? (
                                <img
                                    src={previewImageBack}
                                    alt=''
                                    className='w-full h-full absolute object-cover top-0 left-0'
                                />
                            ) : (
                                <div>
                                    <div>Add photo</div>
                                    <PlusCircleOutlined />
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
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
