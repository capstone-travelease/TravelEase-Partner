import { CheckOutlined, SearchOutlined, StopOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Badge, Button, Input, Space, Table } from 'antd'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { bookingApi } from 'src/apis/booking.api'

type DataType = {
    bookngId: number | string
    roomName: string
    bookingStatus: number
    date: number
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
        case 5:
            return 'success'
        default:
            return 'default'
    }
}

const checkStatusText = (status: number) => {
    switch (status) {
        case 1:
            return 'Ongoing'
        case 2:
            return 'Completed'
        case 3:
            return 'Cancelled'
        case 4:
            return 'Wait to confirm'
        case 5:
            return 'Confirm'
        default:
            return 'Unpaid'
    }
}

const columns = [
    {
        key: 'bookngId',
        title: 'Booking ID',
        width: 120,
        render: (record: DataType) => {
            console.log(record)
            return <span>#{record.bookngId}</span>
        }
    },
    {
        key: 'roomName',
        title: 'Room Name',
        dataIndex: 'roomName'
    },
    {
        key: 'status',
        title: 'Status',
        render: (record: DataType) => {
            const isStatus = checkStatus(record.bookingStatus)
            return <Badge status={isStatus} text={checkStatusText(record.bookingStatus)} />
        }
    },
    {
        key: 'date',
        title: 'Date',
        dataIndex: 'date'
    },
    {
        key: 'action',
        title: 'Action',
        render: (record: DataType) => {
            return (
                <Space size={10}>
                    {record.bookingStatus === 4 && <Button type='primary' size='middle' icon={<CheckOutlined />} />}
                    {record.bookingStatus === 4 && (
                        <Button
                            type='default'
                            onClick={() => console.log(record.bookngId)}
                            size='middle'
                            icon={<StopOutlined />}
                        />
                    )}
                </Space>
            )
        }
    }
]

export default function BookingDetail() {
    const { bookingId } = useParams()

    const { data, isLoading } = useQuery({
        queryKey: ['bookingListDetail'],
        queryFn: () => bookingApi.getBooking({ date: '2024-06-08' })
    })

    const finalData = useMemo(() => {
        return data?.data.result.filter((item) => {
            if (item.date == (bookingId as unknown as number)) {
                return {
                    bookngId: item.bookingId,
                    roomName: item.roomName,
                    bookingStatus: item.bookingStatus,
                    date: item.date
                }
            }
        })
    }, [bookingId, data?.data.result])

    return (
        <div className='p-7'>
            <div className='mb-5 items-center flex justify-between'>
                <h2>Booking List</h2>
                <div className='flex items-center gap-5'>
                    <Input placeholder='Search Room' prefix={<SearchOutlined />} />
                </div>
            </div>
            <Table
                size='large'
                pagination={{ position: ['none', 'bottomCenter'] }}
                columns={columns}
                dataSource={finalData}
                tableLayout='auto'
                loading={isLoading}
            />
        </div>
    )
}
