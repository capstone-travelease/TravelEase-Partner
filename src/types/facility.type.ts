export interface FacilityType {
    facilityId: number
    facilityImage: string
    facilityName: string
}

export interface FacilityListType {
    code: number
    message: string
    list: {
        facilityType: string
        list: FacilityType[]
    }[]
}
