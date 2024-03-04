interface TileSetting {
    innerColor: number;
};
interface NamedColorSets {
    [key: string]: TileSetting[];
};

const ColorSets: NamedColorSets = {
    'Purpley': [
        {
            innerColor: 0x8189B1
        },
        {
            innerColor: 0x616C9E
        },
        {
            innerColor: 0x616C9E
        },
    ],
    'Honey Comb': [
        {
            innerColor: 0xF29940
        },
        {
            innerColor: 0xF29940
        },
        {
            innerColor: 0xEE8011
        },
    ],
};

export {
    TileSetting,
    NamedColorSets,
    ColorSets
};
