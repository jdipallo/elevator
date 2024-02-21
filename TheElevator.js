const { execSync } = require("child_process");

const BOTTOM_FLOOR = 1
const TOP_FLOOR = 52

// apologies for not clarify what the 10 was here -> 'Single floor travel time: 10'
// 10ms seems way to fast and 10 secs seems to long - decided on 1 sec
const FLOOR_TRAVEL_TIME = 1
// thought it would be fun to have the elevator stop and the doors open with a delay of 2 sec 
const DOOR_OPEN_TIME = 2

class Elevator {
    // private attributes
    #currentFloor = 0
    #floorsToStopAt = []
    #floorsVisited = []
    #totalTravelTime = 0

    constructor(startingFloor, floorsToStopAt) {
        this.#currentFloor = startingFloor
        this.#floorsToStopAt = [...floorsToStopAt]  // make a copy of the array

        // lets sort our floors to visit so the elevator can stop in order, up or down, 
        // which is more effecient for an Elevator. Although, this 'bubble sort'  wouldn't 
        //be the most efficient with a very large array
        this.#floorsToStopAt.sort((a, b) => a - b)
    }

    getCurrentFloor() { return this.#currentFloor }
    setCurrentFloor(floor) { this.#currentFloor = floor }

    getFloorsToStopAt() { return this.#floorsToStopAt }
    getFloorsVisited() { return this.#floorsVisited }

    getTotalTravelTime() { return this.#totalTravelTime }

    floorBoundariesOk() {
        let validFloorStops = this.#floorsToStopAt.filter(floor => floor < BOTTOM_FLOOR || floor > TOP_FLOOR)

        if (this.#currentFloor > TOP_FLOOR || this.#currentFloor < BOTTOM_FLOOR || validFloorStops.length !== 0) {
            console.log(`\nYour elevator needs to travel between floors ${BOTTOM_FLOOR} and ${TOP_FLOOR}!!!\n`)
            return false
        } 
        return true
    }

    setTravelTime(time) {
        execSync(`sleep ${time}`)

        // add to our travel time
        this.#totalTravelTime = this.#totalTravelTime + time
    }

    openDoor(floor) {
        process.stdout.write(`Stopping at floor ${floor}. Door opening.....`)

        // add this floor to the floors visited
        this.#floorsVisited.push(floor)
        
        // *** not ideal - thought using async/await with Promises & setTimeout() would suffice for a 
        // sleep function (as used in JS in the Browser) but couldn't get that to work in Node as it is inherently
        // asynchronous 
        execSync(`sleep ${DOOR_OPEN_TIME}`)

        // remove this floor from the floorsToStopAt
        this.#floorsToStopAt.splice(this.#floorsToStopAt.indexOf(floor), 1)

        if (this.#floorsToStopAt.length !== 0) {
            console.log('moving on...\n')
        }
    }

    moveDown() {
        let currentFloor = this.getCurrentFloor()
        let floorsToStopAt = this.getFloorsToStopAt()

        // because floorsToStopAt is sorted, [0] will be the smallest/lowest floor
        // move down unless we hit the bottom floor and there are still floors lower than the current floor
        while (currentFloor >= BOTTOM_FLOOR && currentFloor >= floorsToStopAt[0]) {
            if (floorsToStopAt.includes(currentFloor)) {
                this.openDoor(currentFloor)
            }

            this.setTravelTime(FLOOR_TRAVEL_TIME)

            this.setCurrentFloor(--currentFloor)
        }
    }

    moveUp() {
        let currentFloor = this.getCurrentFloor()
        let floorsToStopAt = this.getFloorsToStopAt()

        // because floorsToStopAt is sorted, the last item in the array will be the largest/highest floor
        // move up unless we hit the top floor and there are still floors higher than the current floor
        // floorsToStopAt.length - 1 gives us the highest floor
        while (currentFloor <= TOP_FLOOR && currentFloor <= floorsToStopAt[floorsToStopAt.length - 1]) {
            if (floorsToStopAt.includes(currentFloor)) {
                this.openDoor(currentFloor)
            }

            this.setTravelTime(FLOOR_TRAVEL_TIME)

            this.setCurrentFloor(++currentFloor)

        }

    }
}

module.exports = Elevator
