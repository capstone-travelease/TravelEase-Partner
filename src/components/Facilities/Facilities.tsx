import { useQuery } from '@tanstack/react-query'
import { Checkbox, Col, Row } from 'antd'
import facilitiesApi from 'src/apis/facilities.api'

type FacilityPropsType = {
    onChange?: (value: number[]) => void
    value?: number[]
}

export default function Facilities({ onChange, value = [] }: FacilityPropsType) {
    const getFacilityQuery = useQuery({
        queryKey: ['facilities'],
        queryFn: facilitiesApi.getFacilities,
        staleTime: 120000
    })

    return (
        <Checkbox.Group style={{ width: '100%' }} onChange={onChange} value={value}>
            {getFacilityQuery.data?.data.list.map((facility, index) => (
                <div key={index} className='w-full'>
                    <h3 className='w-full mt-5'>{facility.facilityType}</h3>
                    <Row gutter={[10, 10]} align='middle'>
                        {facility.list.map((item) => (
                            <Col span={6} key={item.facilityId}>
                                <Checkbox value={item.facilityId}>{item.facilityName}</Checkbox>
                            </Col>
                        ))}
                    </Row>
                </div>
            ))}
        </Checkbox.Group>
    )
}
