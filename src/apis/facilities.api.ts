import { FacilityListType } from 'src/types/facility.type'
import http from 'src/utils/http'

const facilitiesApi = {
    getFacilities: () => {
        return http.get<FacilityListType>('/hotel-management/facilites')
    }
}

export default facilitiesApi
