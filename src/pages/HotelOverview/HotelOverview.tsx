import Header from 'src/components/Header'
import logoImage from 'src/assets/logo.png'
import { Link } from 'react-router-dom'
import { Badge, Button, Card, ConfigProvider, DatePicker, Menu, Rate, Statistic } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons'

export default function HotelOverview() {
    return (
        <div className='bg-secondary min-h-screen'>
            <div className='grid grid-cols-12'>
                <div className='py-5 px-6 min-h-screen text-white bg-[#180101] col-span-2'>
                    <div className='w-36 h-36 m-auto'>
                        <img src={logoImage} alt='logo' className='w-full h-full' />
                    </div>
                    <h4>Menu</h4>
                    <ConfigProvider
                        theme={{
                            components: {
                                Menu: {
                                    itemSelectedBg: '#341C1C',
                                    itemHoverColor: '#ccc',
                                    itemHoverBg: '#341C1C',
                                    itemMarginInline: 0,
                                    itemHeight: 38
                                }
                            }
                        }}
                    >
                        <Menu
                            mode='inline'
                            inlineIndent={24}
                            defaultSelectedKeys={['waste-report']}
                            className='bg-[#180101] !border-none text-base text-white'
                            items={[
                                {
                                    label: 'Overview',
                                    key: '1'
                                },
                                {
                                    label: 'Hotel Management',
                                    key: '2'
                                },
                                {
                                    label: 'Room Management',
                                    key: '3'
                                },
                                {
                                    label: 'Falicities',
                                    key: '4'
                                },
                                {
                                    label: 'Promo',
                                    key: '5'
                                },
                                {
                                    label: 'Feedback',
                                    key: '6'
                                }
                            ]}
                        />
                    </ConfigProvider>
                    <h4 className='my-5'>Support</h4>
                    <Link to={'/'} className='block'>
                        <Button className='bg-[#341C1C] border-none text-white' block icon={<MailOutlined />}>
                            Notification
                            <Badge count={5} className='ml-5' />
                        </Button>
                    </Link>
                    <Link to={'/'} className='mt-3 block'>
                        <Button className='bg-[#341C1C] border-none text-white' block icon={<MessageOutlined />}>
                            Messages
                            <Badge count={2} className='ml-5' />
                        </Button>
                    </Link>
                </div>
                <div className='col-span-10'>
                    <Header logo={false} />
                    <div className='p-5 overflow-y-auto overflow-hidden'>
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
                                    <span className='text-base font-semibold'>
                                        01 Phan Chu Trinh, Ward 9, TP.HCM, Vietnam
                                    </span>
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
                                        <div
                                            key={index}
                                            className='border mb-3 rounded border-solid flex border-gray-500 p-5'
                                        >
                                            <div className='w-[20%]'>
                                                <div className='flex'>
                                                    <div>
                                                        <h3>Reviewed</h3>
                                                        <div>Fri, 20 Oct 2023</div>
                                                    </div>
                                                    <div className='ml-2'>
                                                        4{' '}
                                                        <Rate
                                                            className='text-base'
                                                            disabled
                                                            count={1}
                                                            defaultValue={2}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='bg-[#F7F7F7] p-3 w-full'>
                                                Very nice and comfortable hotel, Very nice and comfortable hotelVery
                                                nice and comfortable hotel, Very nice and comfortable hotelVery nice and
                                                comfortable....
                                            </div>
                                        </div>
                                    )
                                })}
                            <Link to={'/'} className='text-primary text-center block font-semibold'>
                                View all reviews
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
