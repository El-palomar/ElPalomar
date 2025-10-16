export interface IActivity {
    id: number,
    name: string,
    descriptionHome: string,
    description: string,
    category: string,
    image: string,
    isActive?: boolean,
    maxParticipants?: number,
    minAge?: number,
    price?: number,
    instructor?: string,
    equipment?: Array<string>,
    difficulty?: string
}
