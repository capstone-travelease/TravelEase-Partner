import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { ROUTES } from 'src/constants/Routes'

export default function DashBoard() {
    return (
        <div className='px-7 py-7'>
            <div className='grid grid-cols-12 gap-10'>
                <div className='bg-white h-fit rounded-sm shadow col-span-4 overflow-hidden'>
                    <div className='h-44 w-full'>
                        <img
                            src='https://thumbs.dreamstime.com/b/hotel-bed-room-21064950.jpg'
                            alt='hotel_image'
                            className='object-cover h-full w-full'
                        />
                    </div>
                    <div className='p-5'>
                        <div className='flex justify-between items-center'>
                            <h3>Royale President Hotel</h3>
                        </div>
                        <div className='mt-3'>
                            Phone Number <strong>0947284774</strong>
                        </div>
                        <div className='mt-3'>
                            Location <strong>01 Phan Chu Trinh, Ward 9, TP.HCM, Vietnam</strong>
                        </div>
                        <Link to={`${ROUTES.HOTEL}/1`}>
                            <Button type='primary' block className='mt-5'>
                                View Now
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className='bg-white h-fit rounded-sm shadow col-span-4 overflow-hidden'>
                    <div className='h-44 w-full'>
                        <img
                            src='https://thumbs.dreamstime.com/b/hotel-bed-room-21064950.jpg'
                            alt='hotel_image'
                            className='object-cover h-full w-full'
                        />
                    </div>
                    <div className='p-5'>
                        <div className='flex justify-between items-center'>
                            <h3>Royale President Hotel</h3>
                        </div>
                        <div className='mt-3'>
                            Phone Number <strong>0947284774</strong>
                        </div>
                        <div className='mt-3'>
                            Location <strong>01 Phan Chu Trinh, Ward 9, TP.HCM, Vietnam</strong>
                        </div>
                        <Link to={`${ROUTES.HOTEL}/1`}>
                            <Button type='primary' block className='mt-5'>
                                View Now
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className='bg-white h-fit rounded-sm shadow col-span-4 overflow-hidden'>
                    <div className='h-44 w-full'>
                        <img
                            src='https://thumbs.dreamstime.com/b/hotel-bed-room-21064950.jpg'
                            alt='hotel_image'
                            className='object-cover h-full w-full'
                        />
                    </div>
                    <div className='p-5'>
                        <div className='flex justify-between items-center'>
                            <h3>Royale President Hotel</h3>
                        </div>
                        <div className='mt-3'>
                            Phone Number <strong>0947284774</strong>
                        </div>
                        <div className='mt-3'>
                            Location <strong>01 Phan Chu Trinh, Ward 9, TP.HCM, Vietnam</strong>
                        </div>
                        <Button type='primary' disabled block className='mt-5'>
                            Awaiting Approval
                        </Button>
                    </div>
                </div>
                <div className='bg-white shadow rounded-sm p-5 col-span-4'>
                    <p>I want to create list a new hotel</p>
                    <p className='my-5'>
                        We are happy to hear that! Click the button below to begin listing your new hotel. The
                        registration process may take up to 15 minutes.
                    </p>
                    <Link to={ROUTES.CREATE_HOTEL}>
                        <Button type='primary' icon={<PlusOutlined />}>
                            List new hotel
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
