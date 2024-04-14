import { PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import hotelApi from 'src/apis/hotel.api'
import { URL_IMAGE } from 'src/constants/AppConstants'
import { ROUTES } from 'src/constants/Routes'
import { getProfile } from 'src/utils/auth'
import { checkStatusHotel } from 'src/utils/utils'

export default function DashBoard() {
    const userId = getProfile()
    const { data } = useQuery({
        queryKey: ['hotels'],
        queryFn: () => hotelApi.getHotelList(userId)
    })
    const navigate = useNavigate()

    return (
        <div className='px-7 py-7'>
            <div className='grid grid-cols-3 gap-10'>
                {data?.data.list.map((hotel) => (
                    <div key={hotel.hotelId} className='bg-white h-fit rounded-sm shadow col-span-1 overflow-hidden'>
                        <div className='h-44 w-full'>
                            <img
                                src={URL_IMAGE + '/' + hotel.urlPath[0]}
                                alt='hotel_image'
                                className='object-cover h-full w-full'
                            />
                        </div>
                        <div className='p-5'>
                            <div className='flex justify-between items-center'>
                                <h3>{hotel.hotelName}</h3>
                            </div>
                            <div className='mt-3'>
                                Phone Number <strong>{hotel.hotelPhone}</strong>
                            </div>
                            <div className='mt-3'>
                                Location <strong>{hotel.hotelAddress}</strong>
                            </div>
                            <Button
                                type='primary'
                                block
                                className='mt-5'
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
