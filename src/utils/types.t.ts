export type City = {
    cityName: string;
    country: string;
    emoji: string;
    date: Date;
    notes: string;
    position: { lat: number; lng: number };
    id: number;
};

export type Country = { country: string; emoji: string; id: number };