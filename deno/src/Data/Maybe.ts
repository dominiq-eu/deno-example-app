/*
    Maybe.ts
*/

interface Just<T> {
  readonly _type: "MaybeJust";
  readonly value: T;
}

interface Nothing {
  readonly _type: "MaybeNothing";
}

export type Maybe<T> = Just<T> | Nothing;

//
//  Type constructor
//
export const Just = <T>(value: T): Just<T> => //
({ _type: "MaybeJust", value: value });

export const Nothing = () => //
({ _type: "MaybeNothing" });

//
// Return the Just value or the given default one.
//
// @param defaultValue This is the value returned if the maybe is a Nothing
// @param maybe The maybe type to test against a Just or a Nothing
//
export const orDefault = <T>(defaultValue: T, maybe: Maybe<T>): T => {
  switch (maybe._type) {
    case "MaybeJust":
      return maybe.value;

    default:
      return defaultValue;
  }
};

export const isJust = <T>(maybe: Maybe<T>): maybe is Just<T> =>
  (maybe._type === "MaybeJust");

export const isNothing = <T>(maybe: Maybe<T>): maybe is Nothing =>
  !isJust(maybe);

export const value = <T>(just: Just<T>): T => just.value;
