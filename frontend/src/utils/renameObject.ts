import renameBoolean from "./renameBoolean";

type ObjectType = {
    [x: string]: any
}

const renameObject = (new_names: ObjectType | undefined, originObject: ObjectType | undefined, renameBool = false) => {
    if (!new_names && originObject) {
        return originObject
    } else if (!originObject || !new_names) {
        return {}
    }

    const res: ObjectType = {};

    Object.keys(new_names).forEach(new_key => {
        if (new_key in originObject) {
            res[new_names[new_key]] = originObject[new_key];
        }
    })

    if (renameBool) {
        Object.keys(res).forEach(key => {
            if (typeof res[key] === 'boolean' || res[key] === 'нет' || res[key] === 'да')
                res[key] = renameBoolean(res[key]);
        })
    }

    return res;
}

export default renameObject;