import http from 'src/utils/http'

const facilitiesApi = {
    getFacilities: () => {
        return http.get('/facilities')
    }
}

export default facilitiesApi
