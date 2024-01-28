import { Button, Card, Checkbox, Col, Form, Row } from 'antd'

type PropsType = {
    onChangeHotelFacilities?: (value: unknown) => void
    prev: () => void
    next: () => void
}

export default function CreateHotelFacilities({ onChangeHotelFacilities, prev, next }: PropsType) {
    return (
        <Form layout='vertical'>
            <Card>
                <h2>Hotel Facilities</h2>
                <div className='text-gray-500'>Hotel facilities information</div>
                <div className='mt-5'>
                    <Checkbox.Group style={{ width: '100%' }} onChange={onChangeHotelFacilities}>
                        <h3 className='w-full'>Entertainment</h3>
                        <Row gutter={[0, 10]}>
                            <Col span={6}>
                                <Checkbox value='1'>Playground</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='2'>Playground</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='3'>Playground</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='4'>Playground</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='5'>Playground</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='6'>Playground</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='7'>Playground</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='8'>Playground</Checkbox>
                            </Col>
                        </Row>
                        <h3 className='w-full mt-5'>Business</h3>
                        <Row gutter={[0, 16]}>
                            <Col span={6}>
                                <Checkbox value='A'>Playground</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='B'>Playground</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='C'>Playground</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='D'>Playground</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='E'>Playground</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='F'>Playground</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='G'>Playground</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='H'>Playground</Checkbox>
                            </Col>
                        </Row>
                        <h3 className='w-full mt-5'>Social</h3>
                        <Row gutter={[0, 16]}>
                            <Col span={6}>
                                <Checkbox value='9'>A</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='10'>B</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='11'>C</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='12'>D</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='13'>E</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='14'>E</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='15'>E</Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value='16'>E</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </div>
            </Card>
            <div className='mt-5 text-end'>
                <Button type='default' onClick={prev} htmlType='submit' className='min-w-[150px] mr-5'>
                    Previous
                </Button>
                <Button type='primary' onClick={next} htmlType='submit' className='min-w-[150px]'>
                    Next
                </Button>
            </div>
        </Form>
    )
}
