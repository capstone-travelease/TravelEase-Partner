import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Badge, Button, Input, Space, Table } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import roomApi from 'src/apis/room.api'
import defaultImage from 'src/assets/defaultImage.svg'
import { formatCurrency } from 'src/utils/utils'

interface DataType {
    key: string | number
    roomId: number | string
    roomImage: string
    roomName: string
    roomQuantity: number
    roomPrice: number
    status: boolean
    roomType: string
    hotelId: string
}

const columns = [
    {
        key: 'roomId',
        title: 'Room ID',
        dataIndex: 'roomId',
        width: 120
    },
    {
        key: 'roomImage',
        title: 'Image',
        width: 100,
        render: (record: DataType) => (
            <div className='w-14 h-14 rounded overflow-hidden relative'>
                <img src={record.roomImage || defaultImage} alt='' className='w-full h-full absolute object-cover' />
            </div>
        )
    },
    {
        key: 'roomName',
        title: 'Room Name',
        dataIndex: 'roomName'
    },
    {
        key: 'roomPrice',
        title: 'Room Price (VNĐ)',
        render: (record: DataType) => <div>{formatCurrency(record.roomPrice)}</div>
    },
    {
        key: 'status',
        title: 'Status',
        render: (record: DataType) => {
            const isStatus = record.status === true ? 'success' : 'error'
            const statusText = record.status === true ? 'Active' : 'Close'
            return <Badge status={isStatus} text={statusText} />
        }
    },
    {
        key: 'roomQuantity',
        title: 'Quantity',
        dataIndex: 'roomQuantity'
    },
    {
        key: 'roomType',
        title: 'Room Type',
        dataIndex: 'roomType'
    },
    {
        key: 'action',
        title: 'Action',
        render: (record: DataType) => {
            return (
                <Space size={10}>
                    <Link to={`/hotel/${record.hotelId}/edit-room/${record.roomId}`}>
                        <Button type='primary' size='middle' icon={<EditOutlined />} />
                    </Link>
                    <Button
                        type='default'
                        onClick={() => console.log(record.roomId)}
                        size='middle'
                        icon={<DeleteOutlined />}
                    />
                </Space>
            )
        }
    }
]
export default function RoomManagement() {
    const navigate = useNavigate()
    const { hotelId } = useParams()

    const { data, isLoading } = useQuery({
        queryKey: ['roomList', hotelId],
        queryFn: () => roomApi.getRoomList(Number(hotelId))
    })

    return (
        <div className='p-7'>
            <div className='mb-5 items-center flex justify-between'>
                <h2>Room List</h2>
                <div className='flex items-center gap-5'>
                    <Input placeholder='Search Room' prefix={<SearchOutlined />} />
                    <Button
                        type='primary'
                        onClick={() => navigate(`/hotel/${hotelId}/add-room`)}
                        icon={<PlusCircleOutlined />}
                    >
                        Add Room
                    </Button>
                </div>
            </div>
            <Table
                size='large'
                pagination={{ position: ['none', 'bottomCenter'] }}
                columns={columns}
                dataSource={data?.data.list.map((item) => ({
                    key: item.roomId,
                    roomId: item.roomId,
                    roomImage: item.imageUrl[0],
                    roomName: item.roomName,
                    roomQuantity: item.roomQuantity,
                    roomPrice: item.roomPrice,
                    status: item.status,
                    roomType: item.roomType,
                    hotelId: hotelId
                }))}
                tableLayout='auto'
                loading={isLoading}
            />
        </div>
    )
}
