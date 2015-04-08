import {Region} from "./region";
import {Position} from "./position";

function getHorizontalRegions(regionNumber) {
    "use strict";

    let region1, region2, region3;

    if (regionNumber < 3) {
        region1 = this.getRegionByNumber(0);
        region2 = this.getRegionByNumber(1);
        region3 = this.getRegionByNumber(2);
    } else if (regionNumber < 6) {
        region1 = this.getRegionByNumber(3);
        region2 = this.getRegionByNumber(4);
        region3 = this.getRegionByNumber(5);
    } else {
        region1 = this.getRegionByNumber(6);
        region2 = this.getRegionByNumber(7);
        region3 = this.getRegionByNumber(8);
    }

    return [region1, region2, region3];
}

function getVerticalRegions(regionNumber) {
    "use strict";

    let region1, region2, region3;

    switch (regionNumber) {
        case 0:
        case 3:
        case 6:
            region1 = this.getRegionByNumber(0);
            region2 = this.getRegionByNumber(3);
            region3 = this.getRegionByNumber(6);
            break;
        case 1:
        case 4:
        case 7:
            region1 = this.getRegionByNumber(1);
            region2 = this.getRegionByNumber(4);
            region3 = this.getRegionByNumber(7);
            break;
        case 2:
        case 5:
        case 8:
            region1 = this.getRegionByNumber(2);
            region2 = this.getRegionByNumber(5);
            region3 = this.getRegionByNumber(8);
            break;
    }

    return [region1, region2, region3];
}


export class Puzzle {
    constructor() {
        "use strict";

        this.regions = {
            0: new Region(0), 1: new Region(1), 2: new Region(2),
            3: new Region(3), 4: new Region(4), 5: new Region(5),
            6: new Region(6), 7: new Region(7), 8: new Region(8)
        };

        // This object is used for creating the initial state of the puzzles
        // These are the values in the grid that the player will not be able
        // to modify.
        this.lockedRegions = {};
    }

    getRegionByNumber(region) {
        "use strict";

        return this.regions[region];
    }

    add(regionNumber, value, position) {
        "use strict";

        if (!this.isValueLockedInRegion(regionNumber, value)) {
            let region = this.getRegionByNumber(regionNumber);

            if (region && region.canAddToGrid(value, position)) {
                // check for other regions
                if (this.checkHorizontal(regionNumber, position[0], value) &&
                    this.checkVertical(regionNumber, position[1], value)) {
                    return region.add(value, position);
                }
            }
        }

        return false;
    }

    remove(regionNumber, value) {
        "use strict";

        if (!this.isValueLockedInRegion(regionNumber, value)) {
            return this.getRegionByNumber(regionNumber).remove(value);
        }

        return false;
    }

    lockRegionValue(regionNumber, value) {
        "use strict";

        this.lockedRegions[regionNumber + "," + value] = true;
    }

    isValueLockedInRegion(regionNumber, value) {
        "use strict";

        return this.lockedRegions[regionNumber + "," + value];
    }

    checkHorizontal(regionNumber, x, value) {
        "use strict";

        let regions = getHorizontalRegions.call(this, regionNumber);

        return this.checkVerticalOrHorizontal(value, regionNumber, regions, position => {
            return position[0] !== x;
        });
    }

    checkVertical(regionNumber, y, value) {
        "use strict";

        let regions = getVerticalRegions.call(this, regionNumber);

        return this.checkVerticalOrHorizontal(value, regionNumber, regions, position => {
            return position[1] !== y;
        });
    }

    checkVerticalOrHorizontal(value, regionNumber, regions, predicate) {
        "use strict";

        let valid = true;

        regions.forEach(function (region) {
            if (!valid) return false;

            if (regionNumber !== region.number && region.containsValue(value)) {
                valid = predicate(region.getValuePosition(value));
            }
        });

        return valid;
    }

    isSolved() {
        "use strict";

        for (let region in this.regions) if (this.regions.hasOwnProperty(region)) {
            region = this.regions[region];
            if (!region.isComplete()) {
                return false;
            }
        }

        return true;
    }
}