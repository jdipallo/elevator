const Elevator = require('./TheElevator')

function showErrorUsage() {
    console.log('\nError attempting to process arguments. Usage: elevator start=12 floor=2,9,1,32\n')
}

// read in arguments to elevator -> 'floor=x floors=x1,x2,x3,x4,xN'
let args = process.argv
let floor, floors, startingFloor = 0
let floorsToStopAt = [] 

try {
    floor = args[2]
    floors = args[3].split('=')[1]

    startingFloor = Number(floor.split('=')[1])
    floorsToStopAt = floors.split(',')
}
catch (Exception) {
    showErrorUsage()
    return
}

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
