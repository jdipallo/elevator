# elevator
Elevator coding challenge for Outside Analytics to simulate an Elevator given a Starting Floor and a list of Floors to stop at.

elevator takes a starting floor and a comma seperate list of floors to stop at:
elevator.js start=12 floor=2,9,1,32

Assumptions/Decisions made:
1) Elevator will start moving down first, stopping at closest floor
2) To keep it fun, have a time delay when opening door. 2 sec delay
3) Travel time between floors, 1 sec
4) Computes Total Travel Time, not including the door opening
5) TOP_FLOOR = 52 (arbitrary)
6) BOTTOM_FLOOR = 1
7) Starting Floor counts and the doors will open

# install node
Install node here: https://nodejs.org/en/download

# clone repo from terminal/command line
% git clone https://github.com/jdipallo/elevator.git

# move into the elevator folder/directory
% cd elevator

# run elevator from command line
% node elevator.js start=12 floor=2,9,1,32
