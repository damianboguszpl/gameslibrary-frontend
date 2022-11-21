// database need entity for special offerts like this
export interface CarouselInterface {
    items: {
        imageName: string,
        title: string,
        description: string
    }[]
}