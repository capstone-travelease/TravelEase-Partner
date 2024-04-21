import { useQuery } from '@tanstack/react-query'
import { Button, Card, Checkbox, Col, Form, Row } from 'antd'
import { useEffect } from 'react'
import facilitiesApi from 'src/apis/facilities.api'

type PropsType = {
    onFinishFacilities?: (value: { facilities: number[] }) => void
    prev: () => void
    facilities?: number[]
}

export default function CreateHotelFacilities({ onFinishFacilities, prev, facilities }: PropsType) {
    const [form] = Form.useForm<{ facilities: number[] }>()
    const { data } = useQuery({
        queryKey: ['facilities'],
        queryFn: facilitiesApi.getFacilities
    })

    useEffect(() => {
        if (facilities) {
            form.setFieldsValue({
                facilities: facilities
            })
        }
    }, [form, facilities])

    if (!data) {
        return <div>Loading...</div>
    }

    return (
        <Form form={form} layout='vertical' onFinish={onFinishFacilities}>
            <Card>
                <h2>Hotel Facilities</h2>
                <div className='text-gray-500'>Hotel facilities information</div>
                <div>
                    <Form.Item
                        name='facilities'
                        valuePropName='value'
                        rules={[
                            { required: true, type: 'array', min: 1, message: 'Please select at least 1 facility' }
                        ]}
                    >
                        <Checkbox.Group style={{ width: '100%' }}>
                            {data.data.list.map((facility, index) => (
                                <div key={index} className='w-full'>
                                    <h3 className='w-full mt-5'>{facility.facilityType}</h3>
                                    <Row gutter={[10, 10]}>
                                        {facility.list.map((item) => (
                                            <Col span={6} key={item.facilityId}>
                                                <Checkbox value={item.facilityId}>{item.facilityName}</Checkbox>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            ))}
                        </Checkbox.Group>
                    </Form.Item>
                </div>
            </Card>
            <div className='mt-5 text-end'>
                <Button type='default' onClick={prev} className='min-w-[150px] mr-5'>
                    Previous
                </Button>
                <Button type='primary' htmlType='submit' className='min-w-[150px]'>
                    Next
                </Button>
            </div>
        </Form>
    )
}
