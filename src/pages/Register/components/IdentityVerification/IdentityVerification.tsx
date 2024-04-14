import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import { useMemo, useState } from 'react'
import { POLICY } from 'src/constants/AppConstants'

interface Props {
    setIsRegister: React.Dispatch<React.SetStateAction<boolean>>
}

export default function IdentityVerification({ setIsRegister }: Props) {
    const [frontID, setFrontID] = useState<File>()
    const [backID, setBackID] = useState<File>()
    const [isCheck, setIsCheck] = useState(false)

    const previewImageFront = useMemo(() => {
        return frontID ? URL.createObjectURL(frontID) : ''
    }, [frontID])

    const previewImageBack = useMemo(() => {
        return backID ? URL.createObjectURL(backID) : ''
    }, [backID])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFinish = (data: any) => {
        console.log(data)
        console.log(frontID, backID)
    }

    return (
        <div>
            <div className='mb-1'>Start for free</div>
            <h1 className='mb-5'>Sign Up to TravelEase</h1>
            <Form requiredMark={false} layout='vertical' onFinish={handleFinish}>
                <div className='flex justify-between items-center'>
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
                            className='h-24 w-full relative overflow-hidden border-2 cursor-pointer border-solid rounded border-gray-600 flex items-center justify-center text-center'
                            showUploadList={false}
                            maxCount={1}
                            customRequest={(option) => setFrontID(option.file as File)}
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
                        className='w-full ml-5'
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
                            className='h-24 w-full overflow-hidden relative border-2 cursor-pointer border-solid rounded border-gray-600 flex items-center justify-center text-center'
                            showUploadList={false}
                            maxCount={1}
                            customRequest={(option) => setBackID(option.file as File)}
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
                <h4>Privacy Policy</h4>
                <div className='overflow-y-auto h-60 my-3 text-center p-3 border-solid border-2 overflow-hidden border-gray-500 rounded'>
                    <div dangerouslySetInnerHTML={{ __html: POLICY }}></div>
                </div>
                <Checkbox checked={isCheck} onChange={() => setIsCheck(!isCheck)} className='my-4 text-xs'>
                    By registering, I agree to TravelEase’s <span className='text-primary'>Privacy Policy</span>
                </Checkbox>
                <Button type='primary' disabled={!isCheck} block htmlType='submit' className='mt-3' size='large'>
                    Sign up
                </Button>
                <Button onClick={() => setIsRegister(false)} block className='mt-3 bg-gray-400 text-white' size='large'>
                    Back
                </Button>
            </Form>
        </div>
    )
}
