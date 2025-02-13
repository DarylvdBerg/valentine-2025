export type Memory = {
    id: number,
    title: string,
    description: string,
    imageSrc: string,
    location: {
        area: string,
        date: string
        lat: number,
        long: number
    }
}