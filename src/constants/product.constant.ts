export type Season = 'Invierno' | 'Verano' | 'Otoño' | 'Primavera'
export type TypeOfClothing = 'Todos' | 'Formal' | 'Casual' | 'Fiestas' | 'Pijamas' | 'Accesorios'

export interface Product {
    id: string,
    name: string,
    outstanding: boolean,
    description: string,
    season: Season,
    type: TypeOfClothing,
    size: number[],
    brand: string,
    price: number,
    colors: string[],
    offer: boolean,
    discount: number,
    imageUrl: string,
}