/*
    Maybe_test.ts
*/

import { test, assertEquals } from "../test_deps.ts";
import * as Maybe from "./Maybe.ts"

test(function Maybe_orDefault() {

    const value = "=D"

    const just = Maybe.Just(value)
    assertEquals(Maybe.orDefault(value + ".fail", just), value)

    const nothing = Maybe.Nothing()
    assertEquals(Maybe.orDefault("Default", nothing), "Default")
})
