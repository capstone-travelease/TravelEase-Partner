import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space, Table } from 'antd'

interface DataType {
    key: string | number
    id: number | string
    image: string
    name: string
    quantity: number | string
}

const data: DataType[] = []
for (let i = 1; i <= 20; i++) {
    data.push({
        key: i,
        id: i,
        image: 'https://thumbs.dreamstime.com/b/hotel-bed-room-21064950.jpg',
        name: 'John Brown',
        quantity: `${i + 10}`
    })
}

const columns = [
    {
        key: 'image',
        title: 'Image',
        render: (record: DataType) => (
            <div className='w-[60%] h-14 rounded overflow-hidden relative'>
                <img src={record.image} alt='' className='w-full h-full absolute object-cover' />
            </div>
        )
    },
    {
        key: 'id',
        title: 'Room ID',
        dataIndex: 'id'
    },
    {
        key: 'name',
        title: 'Room Name',
        dataIndex: 'name'
    },
    {
        key: 'quantity',
        title: 'Quantity',
        dataIndex: 'quantity'
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
    return (
        <div className='p-7'>
            <div className='mb-5 items-center flex justify-between'>
                <h2>Room List</h2>
                <div className='flex items-center gap-5'>
                    <Input placeholder='Search Room' prefix={<SearchOutlined />} />
                    <Button type='primary' icon={<PlusCircleOutlined />}>
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
