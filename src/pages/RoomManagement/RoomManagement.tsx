import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { Badge, Button, Input, Space, Table } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

interface DataType {
    key: string | number
    id: number | string
    image: string
    name: string
    quantity: number | string
    roomPrice: number
    status: string
    type: string
}

const data: DataType[] = []
for (let i = 1; i <= 20; i++) {
    data.push({
        key: i,
        id: i,
        image: 'https://thumbs.dreamstime.com/b/hotel-bed-room-21064950.jpg',
        name: 'John Brown',
        roomPrice: 100,
        quantity: `${i + 10}`,
        status: 'Active',
        type: 'Luxury'
    })
}

const columns = [
    {
        key: 'id',
        title: 'Room ID',
        dataIndex: 'id',
        width: 120
    },
    {
        key: 'image',
        title: 'Image',
        render: (record: DataType) => (
            <div className='w-14 h-14 rounded overflow-hidden relative'>
                <img src={record.image} alt='' className='w-full h-full absolute object-cover' />
            </div>
        )
    },
    {
        key: 'name',
        title: 'Room Name',
        dataIndex: 'name'
    },
    {
        key: 'roomPrice',
        title: 'Room Price',
        dataIndex: 'roomPrice'
    },
    {
        key: 'status',
        title: 'Status',
        render: (record: DataType) => <Badge status='success' text={record.status} />
    },
    {
        key: 'quantity',
        title: 'Quantity',
        dataIndex: 'quantity'
    },
    {
        key: 'type',
        title: 'Room Type',
        dataIndex: 'type'
    },
    {
        key: 'action',
        title: 'Action',
        render: (record: DataType) => (
            <Space size={10}>
                <Button type='primary' onClick={() => console.log(record.id)} size='middle' icon={<EditOutlined />} />
                <Button type='default' onClick={() => console.log(record.id)} size='middle' icon={<DeleteOutlined />} />
            </Space>
        )
    }
]
export default function RoomManagement() {
    const navigate = useNavigate()
    const { hotelId } = useParams()
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
                pagination={{ position: ['none', 'bottomLeft'] }}
                columns={columns}
                dataSource={data}
                tableLayout='fixed'
            />
        </div>
    )
}
