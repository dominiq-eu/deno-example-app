/*
    Maybe

    This is a Maybe type implementation. It holds a value or Nothing. You
    can ask the type about that and provide a default value if there isn't
    one. Functions that may or may not return a value use this type. It's a
    concept from the functional world to prevent the use of null.

    For reference:
    https://en.wikipedia.org/wiki/Option_type
*/

//  Type Definition  //

interface Just<T> {
    readonly _type: 'MaybeJust'
    readonly value: T
}

interface Nothing<T> {
    readonly _type: 'MaybeNothing'
}

export type Maybe<T> = Just<T> | Nothing<T>

//  Type constructors  //

export const Just = <T>(value: NonNullable<T>): Just<T> => ({
    _type: 'MaybeJust',
    value: value,
})

export const Nothing = <T>(): Nothing<T> => ({ _type: 'MaybeNothing' })

//  Helper  //

/*  Return the Just value or the given default one.  */
export const orDefault = <T>(defaultValue: T, maybe: Maybe<T>): T =>
    isJust(maybe) ? value(maybe) : defaultValue

export const value = <T>(just: Just<T>): T => just.value

//  Type Guards  //

export const isJust = <T>(maybe: Maybe<T>): maybe is Just<T> =>
    maybe._type === 'MaybeJust'

export const isNothing = <T>(maybe: Maybe<T>): maybe is Nothing<T> =>
    !isJust(maybe)
