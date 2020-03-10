/*
    Result.ts
*/

interface Ok<T> {
    readonly _type: 'ResultOkType'
    readonly value: T
}

interface Err {
    readonly _type: 'ResultErrorType'
    readonly reason: string
}

export type Result<T> = Ok<T> | Err

//
//  Type constructor
//
export const Ok = <T>(value: T): Ok<T> => ({
    _type: 'ResultOkType',
    value: value
})

export const Err = (reason: string): Err => ({
    _type: 'ResultErrorType',
    reason
})

//
// CaseOf
// @param result The result to match against an Ok or Error
//
// Code Sample:
// const res = Result.Ok("Everything is good")
// Result.caseOf(res)
//       .ok(value => console.log("Hooray", value))
//       .error(err => console.log("Oops:", err))
//
interface CaseOfType<T> {
    readonly ok: (fn: (val: T) => any) => CaseOfType<T>
    readonly error: (fn: (err?: string) => any) => CaseOfType<T>
}
export const caseOf = <T>(result: Result<T>): CaseOfType<T> => ({
    ok: fn => {
        if (isOk(result)) {
            fn(okValue(result))
        }
        return caseOf(result)
    },
    error: fn => {
        if (isErr(result)) {
            fn(errReason(result))
        }
        return caseOf(result)
    }
})

export const isOk = <T>(result: Result<T>): result is Ok<T> =>
    result._type === 'ResultOkType'

export const isErr = <T>(result: Result<T>): result is Err => !isOk(result)

export const okValue = <T>(ok: Ok<T>): T => ok.value
export const errReason = (error: Err): string => error.reason
