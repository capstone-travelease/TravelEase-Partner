import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, DatePicker, Rate, Statistic } from 'antd'
import { Link } from 'react-router-dom'

export default function HotelOverview() {
    return (
        <div className='p-7'>
            <div className='flex'>
                <Card className='w-full'>
                    <h3>Hotel Information</h3>
                    <div className='text-gray-500'>An overview of the hotel</div>
                    <div className='flex items-center mt-3'>
                        <h2>Royale President Hotel</h2>
                        <Rate className='ml-3 text-base' disabled defaultValue={4} />
                    </div>
                    <div>
                        Phone Number: <span className='text-base font-semibold'>0947284774</span>
                    </div>
                    <div>
                        Location:{' '}
                        <span className='text-base font-semibold'>01 Phan Chu Trinh, Ward 9, TP.HCM, Vietnam</span>
                    </div>
                </Card>
                <Card className='w-full ml-5'>
                    <h3>To Do List</h3>
                    <div className='text-gray-500'>Things you need to do</div>
                    <div className='grid grid-cols-4 gap-5 mt-3'>
                        <div className='border border-solid text-center flex flex-col justify-center  col-span-1  border-gray-300 rounded-md p-3'>
                            <h3>10</h3>
                            <div className='text-xs'>Booking Requests</div>
                        </div>
                        <div className='border border-solid text-center flex flex-col justify-center col-span-1 border-gray-300 rounded-md p-3'>
                            <h3>5</h3>
                            <div className='text-xs'>Empty Room</div>
                        </div>
                        <div className='border border-solid text-center flex flex-col justify-center col-span-1 border-gray-300 rounded-md p-3'>
                            <h3>10</h3>
                            <div className='text-xs'>Room is used</div>
                        </div>
                        <div className='border border-solid text-center flex flex-col justify-center col-span-1 border-gray-300 rounded-md p-3'>
                            <h3>10</h3>
                            <div className='text-xs'>Cancellation Requests</div>
                        </div>
                    </div>
                </Card>
            </div>
            <Card className='mt-5'>
                <div className='flex justify-between'>
                    <div>
                        <h3>Business Insights</h3>
                        <div className='text-gray-500'>
                            An overview of the hotel data for the confirmed order dimension
                        </div>
                    </div>
                    <div>
                        Date period: <DatePicker size='small' placement='bottomLeft' />
                    </div>
                </div>
                <div className='flex mt-3 gap-5'>
                    <Statistic
                        title='Total views'
                        value={'55'}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix='K'
                        className='border border-solid w-full border-gray-300 rounded-md p-3 '
                    />
                    <Statistic
                        title='Revenue'
                        value={'13432444'}
                        precision={0}
                        valueStyle={{ color: '#3f8600' }}
                        suffix='VND'
                        className='border border-solid w-full border-gray-300 rounded-md p-3 '
                    />
                    <Statistic
                        title='Bookings'
                        value={'5'}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                        suffix='%'
                        className='border border-solid w-full border-gray-300 rounded-md p-3 '
                    />
                </div>
            </Card>
            <Card className='mt-5'>
                <h3>Customer reviews</h3>
                <div className='text-gray-500 mb-5'>100 reviews</div>
                {Array(3)
                    .fill(0)
                    .map((_, index) => {
                        return (
                            <div key={index} className='border mb-3 rounded border-solid flex border-gray-500 p-5'>
                                <div className='flex flex-shrink-0'>
                                    <div>
                                        <h3>Reviewed</h3>
                                        <div>Fri, 20 Oct 2023</div>
                                    </div>
                                    <div className='ml-2'>
                                        4 <Rate className='text-base' disabled count={1} defaultValue={2} />
                                    </div>
                                </div>
                                <div className='bg-[#F7F7F7] p-3 ml-6 flex-grow'>
                                    Very nice and comfortable hotel, Very nice and comfortable hotelVery nice and
                                    comfortable hotel, Very nice and comfortable hotelVery nice and comfortable....
                                </div>
                            </div>
                        )
                    })}
                <Link to={'/'} className='text-primary text-center block font-semibold'>
                    View all reviews
                </Link>
            </Card>
        </div>
    )
}
