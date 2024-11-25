export interface IReservation {
    date: string;
    time: string;
    guests: number;
    status: string;
    location: string;
    user_id?: number;
}
