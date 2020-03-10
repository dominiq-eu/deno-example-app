/*
    Coordinate_tests.ts
*/

import { test, assertEquals } from '../test_deps.ts'
import * as Coordinate from './Coordinate.ts'

test(function Coordinate_distance() {
    // Coordinates from:
    // https://www.sunearthtools.com/de/tools/distance.php

    const pos1 = Coordinate.create(0, 0)
    const pos2 = Coordinate.create(38.89, -77.032)
    const pos3 = Coordinate.create(40.76, -73.984)

    assertEquals(Coordinate.distance(pos1, pos1), 0)
    assertEquals(Coordinate.distance(pos2, pos2), 0)
    assertEquals(Coordinate.distance(pos3, pos3), 0)
    assertEquals(Coordinate.distance(pos2, pos3), 333.1136739980425)
})
