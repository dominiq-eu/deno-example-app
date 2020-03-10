/*
    Pipe_test.ts
*/

import { test, assertEquals } from "../test_deps.ts";
import Pipe from "./Pipe.ts"

const reverse = (s: string): string =>
    s.split("").reverse().join("")

test(function Pipe_andThen() {
    const value = "Hello you wonderfull string!"
    assertEquals(value,
        Pipe(value)
            .andThen(reverse)
            .andThen(reverse)
            .value()
    )
})
