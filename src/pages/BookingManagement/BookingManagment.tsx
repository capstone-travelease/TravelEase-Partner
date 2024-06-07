import type { Dayjs } from 'dayjs'
import type { BadgeProps, CalendarProps } from 'antd'
import { Badge, Calendar } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { bookingApi } from 'src/apis/booking.api'
import { useNavigate, useParams } from 'react-router-dom'

const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
        return 1394
    }
}

const checkStatus = (status: number) => {
    switch (status) {
        case 1:
            return 'warning'
        case 2:
            return 'success'
        case 3:
            return 'error'
        case 4:
            return 'default'
        default:
            return 'default'
    }
}

export default function BookingManagment() {
    const navigate = useNavigate()
    const { hotelId } = useParams()

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value)
        return num ? (
            <div className='notes-month'>
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null
    }

    const { data } = useQuery({
        queryKey: ['bookingList'],
        queryFn: () => bookingApi.getBooking({ date: '2024-06-08' })
    })

    const getListData = (value: Dayjs) => {
        const listData: { type: BadgeProps['status']; content: string }[] = []

        data?.data.result.forEach((obj) => {
            if (obj.date === value.date()) {
                listData.push({
                    type: checkStatus(obj.bookingStatus),
                    content: obj.roomName
                })
            }
        })

        return listData || []
    }

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value)
        return (
            <ul className='events'>
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge status={item?.type as BadgeProps['status']} text={item?.content} />
                    </li>
                ))}
            </ul>
        )
    }

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current)
        if (info.type === 'month') return monthCellRender(current)
        return info.originNode
    }

    return (
        <div className='m-10'>
            <Calendar
                cellRender={cellRender}
                onSelect={(date) => {
                    navigate(`/hotel/${hotelId}/booking-detail/${date.date()}`)
                }}
            />
        </div>
    )
}
