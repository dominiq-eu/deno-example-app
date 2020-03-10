/*
    test_deps.ts

    Combine all dependencies we need for testing. The equivalent to
    package.json, but just for tests.
*/

// https://deno.land/std@v0.35.0/testing/asserts.ts?doc
export { fail, assertEquals, assertNotEquals } from "https://deno.land/std@v0.35.0/testing/asserts.ts"
export const { test } = Deno
