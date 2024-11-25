export interface ICustomerReservationResponse {
    id: number,
    date: string,
    time: string,
    status: string,
    location: string,
    user_id: number,
    guests: number,
    name: string,
    surname: string,
    tables: number[],
}
