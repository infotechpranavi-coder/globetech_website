export interface Location {
    id: number;
    name: string;
    state: string;
    image: string;
    propertyCount: number;
}

export const locations: Location[] = [
    {
        id: 1,
        name: "San Francisco",
        state: "California",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
        propertyCount: 1,
    },
    {
        id: 2,
        name: "Dunao",
        state: "California",
        image: "https://images.unsplash.com/photo-1449156001935-52614a37d6b5?w=800&q=80",
        propertyCount: 3,
    },
    {
        id: 3,
        name: "Liverpool",
        state: "California",
        image: "https://images.unsplash.com/photo-1510511459019-5dee997d7db4?w=800&q=80",
        propertyCount: 1,
    },
    {
        id: 4,
        name: "Sacramento",
        state: "California",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
        propertyCount: 2,
    },
    {
        id: 5,
        name: "Los Angeles",
        state: "California",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
        propertyCount: 12,
    },
    {
        id: 6,
        name: "San Diego",
        state: "California",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
        propertyCount: 5,
    }
];
