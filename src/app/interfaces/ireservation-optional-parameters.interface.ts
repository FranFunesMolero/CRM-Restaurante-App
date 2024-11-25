export interface IReservationOptionalParameters {
    [key: string]: string | number | undefined;
    date?: string;
    time?: string;
    status?: string;
    location?: string;
    user_id?: number;
    guests?: number;
}
