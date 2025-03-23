const categories = [
    {
        name: 'category1',
        subcategories: [
            {
                name: 'category2',
                subcategories: []
            },
            {
                name: 'category3',
                subcategories: [
                    {
                        name: 'category4',
                        subcategories: []
                    }
                ]
            }
        ]
    },
    {
        name: 'category5',
        subcategories: []
    }
];

const getCategoryPath = (categories, categoryName) => {
    const findPath = (categories, targetName) => {
        for (const category of categories) {
            // Si encuentro el nombre de la categoría que busco, retorno el nombre de la categoría
            if (category.name === targetName) {
                return '/' + category.name;
            }
            
            // En caso de no encontrarlo, busco en las subcategorías si es que tiene
            if (category.subcategories.length > 0) {
                // Ejecuto la función recursivamente para buscar en las subcategorías
                const subPath = findPath(category.subcategories, targetName);
                if (subPath) {
                    // En caso de encontrar la subcategoría, retorno el nombre de la categoría padre + el nombre de la subcategoría
                    return '/' + category.name + subPath;
                }
            }
        }
        return null;
    };
    // Ejecuto la función recursiva para buscar la categoría con su path completo y retorno el resultado
    return findPath(categories, categoryName) || '';
};

// En un principio intenté probar con un reduce que crea un array nuevo con un solo valor sacando así el resultado esperado,
// pero por rendimiento decidí hacerlo con un for of que no crea un array nuevo y solo retorna el valor que necesito, además hace un código
// más limpio y entendible. No usé el for básico porque no tenía necesidad de usar el índice para nada reduciendo el código a lo que necesito

console.log(getCategoryPath(categories, 'category4')); // should output: '/category1/category3/category4'
console.log(getCategoryPath(categories, 'category2')); // should output: '/category1/category2'
console.log(getCategoryPath(categories, 'category5')); // should output: '/category5'