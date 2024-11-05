export interface ContactProps {
  _id: string
  contactName: string
  phoneNumber: string
  location: {
    type: string
    coordinates: [number, number]
  }
  views: number
  alertEmitted?: boolean
}

interface CreateContactProps {
  contactName: string
  phoneNumber: string
  latitude: number
  longitude: number
  views?: number
}

export interface PhoneProps {
  point: {
    type: string
    coordinates: [number, number]
  }
  _id: string
  phone_number: string
  phone_model: string
  brand: string
  imei: string
  status: string
  isStolen: boolean
  userId: string
  createdAt: string
  updatedAt: string
  __V: number
}