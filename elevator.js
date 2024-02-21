const Elevator = require('./TheElevator')

// read in arguments to elevator -> 'floor=x floors=x1,x2,x3,x4,xN'
let args = process.argv

if (!args[2] || !args[3]) {
    console.log('\nMissing arguments: Usage: elevator start=12 floor=2,9,1,32\n')
    return
}

let floor = args[2]
let floors = args[3].split('=')[1]

let startingFloor = Number(floor.split('=')[1])
let floorsToStopAt = floors.split(',')

// convert each floor to a Number
floorsToStopAt = floorsToStopAt.map(floorAsStr => Number(floorAsStr))

// add starting floor as a stop per instructions
floorsToStopAt.push(startingFloor)

// instaniate a new Elevator Object
let elevator = new Elevator(startingFloor, floorsToStopAt)

// lets assume we'll start with the Elevator moving down
if (elevator.floorBoundariesOk()) {
    console.log('\n===================================================\n')

    elevator.moveDown()
    elevator.moveUp()

    console.log('\n===================================================\n')
    console.log(`Total Travel Time: ${elevator.getTotalTravelTime()} seconds - Floors Visited: ${elevator.getFloorsVisited()}`)
    console.log('\n===================================================\n')
} else return

