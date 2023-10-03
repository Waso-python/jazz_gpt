import renameObject from "./renameObject";

describe('renameObject', () => {
    test('Проверка на отсутствие параметров', () => {
        expect(renameObject(undefined, {name: 'val1'}, false)).toEqual({name: 'val1'})
        expect(renameObject({name: 'val1'}, undefined, false)).toEqual({})
    })

    test('Проверка на пустые объекты', () => {
        expect(renameObject({name: 'val1'}, {}, false)).toEqual({})

        expect(renameObject({}, {}, false)).toEqual({})

        expect(renameObject({}, {name: 'val1'}, false)).toEqual({})
    })

    test('Проверка переименования', () => {
        const newNames = {name: 'имя'}
        const originObject = {name: 'Рома'}

        expect(renameObject(newNames, originObject)).toEqual({'имя': 'Рома'})

        expect(renameObject(newNames, originObject)).toEqual({'имя': 'Рома'})
    })

    test('Проверка переименования boolean значений', () => {
        const newNames = {'author': 'автор', married: 'женат', employeed: 'трудоустроен', boxer: 'боксер', brownEyed: 'кареглазый'}
        const originObject = {author: true, married: false, employeed: 'да', boxer: 'нет', brownEyed: 'да1'}
        const resultObject = {автор: 'да', женат: 'нет', трудоустроен: true, боксер: false, кареглазый: 'да1'}

        expect(renameObject(newNames, originObject, true)).toEqual(resultObject)
    })
})