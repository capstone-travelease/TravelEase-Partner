import { Button, Steps, message } from 'antd'
import { useState } from 'react'
import Header from 'src/components/Header'
import CreateHotelDetail from 'src/pages/CreateHotel/components/CreateHotelDetail'

const steps = [
    {
        title: 'Hotel Information',
        content: <CreateHotelDetail />
    },
    {
        title: 'Hotel Facilities',
        content: 'Second-content'
    },
    {
        title: 'Room',
        content: 'Last-content'
    },
    {
        title: 'Room Facilities',
        content: 'Last-content'
    },
    {
        title: 'Photo',
        content: '222'
    },
    {
        title: 'Confirm',
        content: '222'
    }
]

export default function CreateHotelLayout() {
    const [current, setCurrent] = useState(0)

    const next = () => {
        setCurrent(current + 1)
    }

    const prev = () => {
        setCurrent(current - 1)
    }

    return (
        <div className='bg-secondary min-h-screen'>
            <Header logo={true} />
            <div className='p-7 flex'>
                <div className='w-[30%]'>
                    <Steps direction='vertical' current={current} items={steps} />
                </div>
                <div className='w-full'>
                    <div>{steps[current].content}</div>
                    <div className='mt-5 text-end'>
                        {current > 0 && (
                            <Button type='default' className='mr-5' onClick={() => prev()}>
                                Previous
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type='primary' onClick={() => message.success('Processing complete!')}>
                                Confirm and Send
                            </Button>
                        )}
                        {current < steps.length - 1 && (
                            <Button type='primary' className='min-w-[150px]' onClick={() => next()}>
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
