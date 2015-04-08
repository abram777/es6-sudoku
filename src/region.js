import {Position} from "./position";

export class Region {
    constructor(number) {
        "use strict";

        this.number = number;
        this.grid = {};
        this.occupiedPositions = {};
    }

    static isPositionValid(position) {
        "use strict";

        let x = position[0];
        let y = position[1];

        if ((x < 0 || x > 2) || (y < 0 || y > 2)) {
            return false;
        }

        return true;
    }

    containsValue(value) {
        "use strict";

        return !!this.grid[value];
    }

    add(value, position) {
        "use strict";

        if (this.canAddToGrid(value, position)) {
            this.grid[value] = position;
            this.occupiedPositions[position.toString()] = true;

            return true;
        }
        return false;
    }

    getValuePosition(value) {
        "use strict";

        return this.grid[value];
    }

    remove(value) {
        "use strict";

        if(!this.containsValue(value)) {
            return false;
        }

        this.occupiedPositions[this.getValuePosition(value).toString()] = false;
        delete this.grid[value];

        return true;
    }

    isPositionOccupied(position) {
        "use strict";

        return this.occupiedPositions[position.toString()];
    }

    canAddToGrid(value, position) {
        "use strict";

        return Region.isPositionValid(position) &&
               !this.containsValue(value) &&
               !this.isPositionOccupied(position);
    }

    isComplete(log) {
        "use strict";

        if (log) console.log(this.grid);
        return Object.keys(this.grid).length === 9;
    }
}
