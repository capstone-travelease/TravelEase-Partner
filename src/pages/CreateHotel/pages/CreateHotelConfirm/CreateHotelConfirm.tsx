import { useQuery } from '@tanstack/react-query'
import { Button, Card, Checkbox, Col, Divider, Row } from 'antd'
import { RcFile } from 'antd/es/upload'
import { useMemo } from 'react'
import facilitiesApi from 'src/apis/facilities.api'
import {
    HotelDetailFormValue,
    HotelPolicyFormValue
} from 'src/pages/CreateHotel/layouts/CreateHotelLayout/CreateHotelLayout'

type PropsType = {
    prev: () => void
    handleCreateHotel: () => void
    hotelInfo?: HotelDetailFormValue
    facilities?: number[]
    hotelPolicy?: HotelPolicyFormValue
    hotelPhoto?: RcFile[]
}

export default function CreateHotelConfirm({
    prev,
    handleCreateHotel,
    hotelInfo,
    facilities,
    hotelPhoto,
    hotelPolicy
}: PropsType) {
    const previewImage = useMemo(() => {
        return hotelPhoto?.map((file) => {
            return URL.createObjectURL(file as File)
        })
    }, [hotelPhoto])

    const { data } = useQuery({
        queryKey: ['facilities'],
        queryFn: facilitiesApi.getFacilities
    })

    return (
        <div>
            <h2 className=''>Review Hotel Information</h2>
            <Card className='mt-2'>
                <div className='flex'>
                    <div className='min-w-[35%] font-semibold'>Hotel Name</div>
                    <div>{hotelInfo?.hotelName}</div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[35%] font-semibold'>Hotel Description</div>
                    <div>{hotelInfo?.hotelDescription}</div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[35%] font-semibold'>Phone Number</div>
                    <div>{hotelInfo?.hotelContactNumber}</div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[35%] font-semibold'>Address</div>
                    <div>
                        {hotelInfo?.hotelAddress}, {hotelInfo?.hotelCity}, {hotelInfo?.hotelCounty}
                    </div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[35%] font-semibold'>Hotel Email Address</div>
                    <div>{hotelInfo?.hotelEmail}</div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[35%] font-semibold'>Check-in time</div>
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
                            {hotelInfo?.checkInTime}
                        </div>
                    </div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[35%] font-semibold'>Check-out time</div>
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
                            {hotelInfo?.checkOutTime}
                        </div>
                    </div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[35%] font-semibold'>Hotel Photo</div>
                    <div className='overflow-x-auto'>
                        <div className='w-full flex items-center gap-5'>
                            {previewImage?.map((image, index) => {
                                return (
                                    <div
                                        className='w-[200px] h-[220px] flex-shrink-0 rounded overflow-hidden'
                                        key={index}
                                    >
                                        <img src={image} alt='hotel' className='w-full h-full object-cover' />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[35%] font-semibold'>Hotel Facilities</div>
                    <div className='w-full'>
                        <Checkbox.Group
                            style={{ width: '70%' }}
                            className='flex flex-col gap-[10px] relative'
                            defaultValue={facilities}
                        >
                            <div className='absolute w-full h-full bg-gray-400 z-20 opacity-0'></div>
                            <Row gutter={[10, 10]} className='items-center'>
                                {data?.data.list.map((facility) => {
                                    return facility.list.map((item) => {
                                        const isHasFacility = facilities?.includes(item.facilityId)
                                        if (isHasFacility) {
                                            return (
                                                <Col span={12} key={item.facilityId}>
                                                    <Checkbox value={item.facilityId}>{item.facilityName}</Checkbox>
                                                </Col>
                                            )
                                        }
                                    })
                                })}
                            </Row>
                        </Checkbox.Group>
                    </div>
                </div>
                <Divider className='bg-gray-400' />
                <div className='flex'>
                    <div className='min-w-[35%] font-semibold'>Hotel Policy</div>
                    <div className='flex flex-col gap-3'>
                        <div>Check-in: {hotelPolicy?.checkInPolicy}</div>
                        <div>Check-out: {hotelPolicy?.checkOutPolicy}</div>
                        <div>Cancellation: {hotelPolicy?.cancellationPolicy}</div>
                    </div>
                </div>
            </Card>
            <div className='mt-5 text-end'>
                <Button type='default' onClick={prev} className='min-w-[150px] mr-5'>
                    Previous
                </Button>
                <Button type='primary' onClick={handleCreateHotel} className='min-w-[150px]'>
                    Confirm and Send
                </Button>
            </div>
        </div>
    )
}
