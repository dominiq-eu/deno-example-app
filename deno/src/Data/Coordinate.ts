/*
    Coordinate.ts

    Data type representing a geographic coordinate on earth.
*/

export interface Coordinate {
  readonly _type: "CoordinateType";
  readonly lat: number;
  readonly lng: number;
}

//
//  Helper
//
const toRadians = (x: number): number => (x * Math.PI) / 180;
const earthRadius = 6371.009; // Approximatly according to wolframalpha.com

//
// Create a coordinate.
//
// @param latitude Latitude part of a geographic coordinat
// @param longitude Longitude part of a geographic coordinate
//
export const create = (latitude: number, longitude: number): Coordinate => ({
  _type: "CoordinateType",
  lat: latitude,
  lng: longitude
});

//
// Calculates the distance between two geographic points.
//
export const distance = (p1: Coordinate, p2: Coordinate): number => {
  // Use the haversine forumla to calculate the distance
  // https://en.wikipedia.org/wiki/Great-circle_distance
  // https://www.movable-type.co.uk/scripts/latlong.html
  // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula

  const dLat = toRadians(p2.lat - p1.lat);
  const dLng = toRadians(p2.lng - p1.lng);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(p1.lat)) *
    Math.cos(toRadians(p2.lat)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = earthRadius * c;
  return d;
};
