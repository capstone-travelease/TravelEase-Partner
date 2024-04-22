import CreateHotelConfirm from 'src/pages/CreateHotel/pages/CreateHotelConfirm'
import CreateHotelDetail from 'src/pages/CreateHotel/pages/CreateHotelDetail'
import CreateHotelFacilities from 'src/pages/CreateHotel/pages/CreateHotelFacilities'
import CreateHotelPhoto from 'src/pages/CreateHotel/pages/CreateHotelPhoto'
import CreateHotelPolicy from 'src/pages/CreateHotel/pages/CreateHotelPolicy'
import ModalNotification from 'src/components/ModalNotification'
import Header from 'src/components/Header'
import { ROUTES } from 'src/constants/Routes'
import { Spin, Steps } from 'antd'
import { useContext, useState } from 'react'
import { RcFile } from 'antd/es/upload'
import { AppContext } from 'src/contexts/app.context'
import { useMutation } from '@tanstack/react-query'
import hotelApi from 'src/apis/hotel.api'
import { toast } from 'react-toastify'

export type HotelDetailFormValue = {
    hotelName: string
    hotelAddress: string
    hotelCity: string
    hotelCountry: string
    hotelContactNumber: string
    hotelEmail: string
    hotelDescription: string
    checkInTime: string
    checkOutTime: string
}

export type HotelPolicyFormValue = {
    cancellationPolicy: string
    checkInPolicy: string
    checkOutPolicy: string
}

export type AddHotelData = HotelDetailFormValue &
    HotelPolicyFormValue & { facilities: number[]; userId: string | number }

export default function CreateHotelLayout() {
    const [current, setCurrent] = useState(0)
    const [spinning, setSpinning] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [hotelInfo, setHotelInfo] = useState<HotelDetailFormValue>()
    const [facilities, setFacilities] = useState<number[]>()
    const [hotelPolicy, setHotelPolicy] = useState<HotelPolicyFormValue>()
    const [hotelPhoto, setHotelPhoto] = useState<RcFile[]>()
    const { profile } = useContext(AppContext)

    const addHotelMutation = useMutation({
        mutationFn: hotelApi.addHotel
    })
    const uploadImageMutation = useMutation({
        mutationFn: hotelApi.uploadImage
    })

    const onFinishHotelInfo = (value: HotelDetailFormValue) => {
        setHotelInfo(value)
        setCurrent(1)
    }
    const onFinishFacilities = (value: { facilities: number[] }) => {
        setFacilities(value.facilities)
        setCurrent(2)
    }

    const onFinishHotelPolicy = (value: HotelPolicyFormValue) => {
        setHotelPolicy(value)
        setCurrent(3)
    }
    const onFinishHotelPhoto = (value: RcFile[]) => {
        setHotelPhoto(value)
        setCurrent(4)
    }

    const prev = () => {
        setCurrent(current - 1)
    }

    const handleCreateHotel = async () => {
        try {
            const hotelData: AddHotelData = {
                ...(hotelInfo as HotelDetailFormValue),
                ...(hotelPolicy as HotelPolicyFormValue),
                facilities: facilities as number[],
                userId: Number(profile?.userId)
            }
            setSpinning(true)
            const res = await addHotelMutation.mutateAsync(hotelData)
            const hotelId = res.data.hotelId
            if (hotelPhoto) {
                const form = new FormData()
                hotelPhoto.forEach((photo) => {
                    form.append('image', photo as File)
                })
                await uploadImageMutation.mutateAsync({ hotelId: hotelId, formData: form })
            }
            setIsModalOpen(true)
        } catch (error) {
            toast.error('Create hotel failed')
        } finally {
            setSpinning(false)
        }
    }

    const steps = [
        {
            title: 'Hotel Information',
            content: <CreateHotelDetail hotelInfo={hotelInfo} onFinishHotelInfo={onFinishHotelInfo} />
        },
        {
            title: 'Hotel Facilities',
            content: (
                <CreateHotelFacilities prev={prev} facilities={facilities} onFinishFacilities={onFinishFacilities} />
            )
        },
        {
            title: 'Hotel Policy',
            content: (
                <CreateHotelPolicy prev={prev} hotelPolicy={hotelPolicy} onFinishHotelPolicy={onFinishHotelPolicy} />
            )
        },
        {
            title: 'Hotel Photo',
            content: (
                <CreateHotelPhoto prev={prev} setHotelPhoto={setHotelPhoto} onFinishHotelPhoto={onFinishHotelPhoto} />
            )
        },
        {
            title: 'Confirm',
            content: (
                <CreateHotelConfirm
                    hotelInfo={hotelInfo}
                    facilities={facilities}
                    hotelPolicy={hotelPolicy}
                    hotelPhoto={hotelPhoto}
                    prev={prev}
                    handleCreateHotel={handleCreateHotel}
                />
            )
        }
    ]

    return (
        <div className='bg-secondary min-h-screen'>
            <Spin spinning={spinning} size='large' fullscreen />
            <ModalNotification open={isModalOpen} btnContent='Go Dashboard' routes={ROUTES.DASHBOARD} />
            <Header logo={true} />
            <div className='p-7 grid grid-cols-[280px_1fr]'>
                <div className=''>
                    <Steps direction='vertical' current={current} items={steps} />
                </div>
                <div className='w-full'>{steps[current].content}</div>
            </div>
        </div>
    )
}
