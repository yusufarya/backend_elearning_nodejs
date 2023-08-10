import { ResponseError } from "../error/response-error.js"

const validate = async (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    })

    if(result.error) {
        throw new ResponseError(400, result.error.message)
    } else {
        return new result
    }
}

export {
    validate
}