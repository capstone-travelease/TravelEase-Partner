import { Steps } from 'antd'
import { useState } from 'react'
import Header from 'src/components/Header'
import CreateHotelDetail from 'src/pages/CreateHotel/components/CreateHotelDetail'
import CreateHotelFacilities from 'src/pages/CreateHotel/components/CreateHotelFacilities'
import CreateHotelPhoto from 'src/pages/CreateHotel/components/CreateHotelPhoto'
import CreateHotelPolicy from 'src/pages/CreateHotel/components/CreateHotelPolicy'

export default function CreateHotelLayout() {
    const [current, setCurrent] = useState(0)

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

    const prev = () => {
        setCurrent(current - 1)
    }

    const next = () => {
        setCurrent(current + 1)
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
            title: 'Photo',
            content: <CreateHotelPhoto prev={prev} />
        },
        {
            title: 'Confirm',
            content: <CreateHotelDetail />
        }
    ]

    return (
        <div className='bg-secondary min-h-screen'>
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
