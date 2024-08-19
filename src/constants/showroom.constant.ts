export interface ShowRoom {
    name: string,
    description: string,
    titleAbout: string,
    historyAbout: string,
    country: string,
    city: string,
    address: string,
    postalCode: string,
    imageUrl: string,
    supportMail: string,
    phoneNumber: string,
    socialMedia: {
        facebook: string,
        twitter: string,
        instagram: string
    }
}

//[ ] INTERFAZ PARCIAL PARA EL ABOUT
export type About = Pick<ShowRoom, 'titleAbout' | 'historyAbout' |'imageUrl'>

//[ ] INTERFAZ PARCIAL PARA EL FORMULARIO DE CONTACTO
export type Contact = Pick<ShowRoom, 'phoneNumber' | 'country' | 'socialMedia'>

//[ ] INTERFAZ PARCIAL PARA EL TITULO Y DESCRIPCIÓN DEL HOME
export type Home = Pick<ShowRoom, 'name' | 'description'>