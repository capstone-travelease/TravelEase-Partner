import { PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Spin } from 'antd'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { URL_IMAGE } from 'src/constants/AppConstants'
import hotelApi from 'src/apis/hotel.api'
import { ROUTES } from 'src/constants/Routes'
import { AppContext } from 'src/contexts/app.context'
import { checkStatusHotel } from 'src/utils/utils'
import defaultImage from 'src/assets/defaultImage.svg'

export default function DashBoard() {
    const { profile } = useContext(AppContext)
    const { data, isLoading } = useQuery({
        queryKey: ['hotels'],
        queryFn: () => hotelApi.getHotelList(profile?.userId as string)
    })
    const navigate = useNavigate()

    return (
        <div className='px-7 py-7'>
            <Spin spinning={isLoading} fullscreen />
            <div className='grid grid-cols-3 gap-10'>
                {data?.data.list.map((hotel) => (
                    <div
                        key={hotel.hotelId}
                        className='bg-white flex flex-col rounded-sm shadow col-span-1 overflow-hidden'
                    >
                        <div className='h-44 w-full flex-shrink-0'>
                            <img
                                src={hotel.urlPath[0] ? `${URL_IMAGE}/${hotel.urlPath[0]}` : defaultImage}
                                alt='hotel_image'
                                className='object-cover h-full w-full'
                            />
                        </div>
                        <div className='p-5 flex-grow flex flex-col justify-between gap-4'>
                            <div className='flex flex-col justify-between gap-2'>
                                <h3>{hotel.hotelName}</h3>
                                <div>
                                    Phone Number <strong>{hotel.hotelPhone}</strong>
                                </div>
                                <div>
                                    Location <strong>{hotel.hotelAddress}</strong>
                                </div>
                            </div>
                            <Button
                                type='primary'
                                block
                                onClick={() => navigate(`${ROUTES.HOTEL}/${hotel.hotelId}`)}
                                disabled={checkStatusHotel(hotel.statusId).status}
                            >
                                {checkStatusHotel(hotel.statusId).text}
                            </Button>
                        </div>
                    </div>
                ))}
                <div className='bg-white shadow rounded-sm h-fit p-5 col-span-1'>
                    <p className='font-medium'>&quot;I want to create list a new hotel&quot;</p>
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
