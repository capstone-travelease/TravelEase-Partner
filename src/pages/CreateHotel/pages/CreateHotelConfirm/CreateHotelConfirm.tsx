import { Button, Card, Divider, Form } from 'antd'

type PropsType = {
    prev: () => void
    handleCreateHotel: () => void
}

export default function CreateHotelConfirm({ prev, handleCreateHotel }: PropsType) {
    return (
        <Form layout='vertical'>
            <h2 className=''>Review Hotel Information</h2>
            <Card className='mt-2'>
                <div className='flex'>
                    <div className='min-w-[25%] font-semibold'>Hotel Name</div>
                    <div>Royale President Hotel</div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[25%] font-semibold'>Hotel Description</div>
                    <div>Luxurious hotel in the heart of downtown</div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[25%] font-semibold'>Phone Number</div>
                    <div>0921387261</div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[25%] font-semibold'>Address</div>
                    <div>01 Phan Chu Trinh, Ward 9, TP.HCM, Vietnam</div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[25%] font-semibold'>Hotel Email Address</div>
                    <div>presidenthotel@gmail.com</div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[25%] font-semibold'>Check-in time</div>
                    <div>
                        <div className='border flex items-center border-gray-300 min-w-[80px] text-center bg-gray-200  rounded-lg px-2 py-1 border-solid'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-5 h-5 mr-2'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                                />
                            </svg>
                            13:00
                        </div>
                    </div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[25%] font-semibold'>Check-out time</div>
                    <div>
                        <div className='border flex items-center border-gray-300 min-w-[80px] text-center bg-gray-200  rounded-lg px-2 py-1 border-solid'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-5 h-5 mr-2'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                                />
                            </svg>
                            12:00
                        </div>
                    </div>
                </div>
            </Card>
            <h2 className='mt-4'>Contact Signatory Information</h2>
            <Card className='mt-2'>
                <div className='flex'>
                    <div className='min-w-[25%] font-semibold'>Full Name</div>
                    <div>Nguyen Khoi Nguyen</div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[25%] font-semibold'>Owner Email</div>
                    <div>khoinguyen123@gmail.com</div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[25%] font-semibold'>Phone Number</div>
                    <div>0934863248</div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[25%] font-semibold'>Identification card</div>
                    <div className='flex w-full gap-8'>
                        <div className='flex-1'>
                            ID Front
                            <div className='h-[200px] rounded p-3 mt-2 border border-solid border-gray-500'>
                                <img
                                    src='https://hatinh.gov.vn/uploads/topics/16117075967123.jpg'
                                    alt='idFront'
                                    className='w-full h-full'
                                />
                            </div>
                        </div>
                        <div className='flex-1'>
                            ID Front
                            <div className='p-3 h-[200px] rounded mt-2 border border-solid border-gray-500'>
                                <img
                                    src='https://static.cand.com.vn/Files/Image/phulu/2021/03/11/thumb_660_d2cb0712-aea1-4b37-bd7a-76a27ef461f0.jpg'
                                    alt='idFront'
                                    className='w-full h-full'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <div className='mt-5 text-end'>
                <Button type='default' onClick={prev} htmlType='submit' className='min-w-[150px] mr-5'>
                    Previous
                </Button>
                <Button type='primary' onClick={handleCreateHotel} htmlType='submit' className='min-w-[150px]'>
                    Confirm and Send
                </Button>
            </div>
        </Form>
    )
}
