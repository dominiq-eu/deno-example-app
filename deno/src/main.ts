/*
    main.ts

*/
import * as Customer from "./Data/Customer.ts"
import * as Maybe from "./Data/Maybe.ts"
import * as Coord from "./Data/Coordinate.ts"

// Future of voice coordinates
const FovPos = Coord.create(52.493256, 13.446082)

// Invite all customers in this distance in km
const CustomerInviteDistKM = 100 //km

// Console log for use in a pipe.
const log = (msg: string) => (obj: NonNullable<any>) => {
    console.log(msg, obj)
    return obj
}

const readFileContents = async (filename: string): Promise<String> => {
    const blob = await Deno.readFile(filename)
    const filedata = new TextDecoder('utf-8').decode(blob)
    return filedata
}

const main = async () => {
    const contents = await readFileContents('/data/customers.txt')
    const customerMaybeList = contents.split(/\r?\n/).map(Customer.parse)
    const customerErrorList = customerMaybeList.filter(Maybe.isNothing)

    // Create customer list
    const customerList =
        customerMaybeList
            .filter(Maybe.isJust)
            .map(Maybe.value)

    // Customer ID's to invite
    const customerInviteIds =
        customerList
            .filter(c => (Coord.distance(FovPos, c.pos) <= CustomerInviteDistKM))
            .map(c => c.id)
            .sort()

    // log errors
    customerErrorList.map(log("Error"))

    // Log all customers to invite
    customerInviteIds.map(log("Customer:"))


    const pos1 = Coord.create(0.0, 0.0);
    const pos2 = Coord.create(0.0, 0.0);
    const distance = Coord.distance(pos2, pos1)
    console.log("Dist:", distance)
}

main()
