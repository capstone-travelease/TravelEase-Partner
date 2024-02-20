import { Spin, Steps } from 'antd'
import { useState } from 'react'
import Header from 'src/components/Header'
import ModalNotification from 'src/components/ModalNotification'
import { ROUTES } from 'src/constants/Routes'
import CreateHotelConfirm from 'src/pages/CreateHotel/pages/CreateHotelConfirm'
import CreateHotelDetail from 'src/pages/CreateHotel/pages/CreateHotelDetail'
import CreateHotelFacilities from 'src/pages/CreateHotel/pages/CreateHotelFacilities'
import CreateHotelPhoto from 'src/pages/CreateHotel/pages/CreateHotelPhoto'
import CreateHotelPolicy from 'src/pages/CreateHotel/pages/CreateHotelPolicy'

export default function CreateHotelLayout() {
    const [current, setCurrent] = useState(0)
    const [spinning, setSpinning] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const onFinishHotelInfo = (value: unknown) => {
        console.log(value)
        setCurrent(1)
    }
    const onChangeHotelFacilities = (value: unknown) => {
        console.log(value)
    }
    const onFinishHotelPolicy = (value: unknown) => {
        console.log(value)
        setCurrent(3)
    }
    const onFinishHotelPhoto = (value: unknown) => {
        console.log(value)
        setCurrent(4)
    }

    const prev = () => {
        setCurrent(current - 1)
    }

    const next = () => {
        setCurrent(current + 1)
    }

    const handleCreateHotel = () => {
        console.log(current)
        setSpinning(true)
        setTimeout(() => {
            setSpinning(false)
            setIsModalOpen(true)
        }, 1000)
    }

    const steps = [
        {
            title: 'Hotel Information',
            content: <CreateHotelDetail onFinishHotelInfo={onFinishHotelInfo} />
        },
        {
            title: 'Hotel Facilities',
            content: <CreateHotelFacilities prev={prev} next={next} onChangeHotelFacilities={onChangeHotelFacilities} />
        },
        {
            title: 'Hotel Policy',
            content: <CreateHotelPolicy prev={prev} onFinishHotelPolicy={onFinishHotelPolicy} />
        },
        {
            title: 'Confirm',
            content: <CreateHotelConfirm prev={prev} handleCreateHotel={handleCreateHotel} />
        },
        {
            title: 'Photo',
            content: <CreateHotelPhoto prev={prev} onFinishHotelPhoto={onFinishHotelPhoto} />
        }
    ]

    return (
        <div className='bg-secondary min-h-screen'>
            <Spin spinning={spinning} size='large' fullscreen />
            <ModalNotification open={isModalOpen} btnContent='Go Dashboard' routes={ROUTES.DASHBOARD} />
            <Header logo={true} />
            <div className='p-7 flex'>
                <div className='w-[30%]'>
                    <Steps direction='vertical' current={current} items={steps} />
                </div>
                <div className='w-full'>{steps[current].content}</div>
            </div>
        </div>
    )
}
