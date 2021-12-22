interface Mission {
    name: string;
    acronyms: string;
    vehicle: string;
    status: string;
    type: string;
    body: string;
    apogee: number;
    perigee: number;
}
interface obj extends Object {
    [key: string]: any;
}
