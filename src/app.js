import {Puzzle} from "./puzzle";
import * as dom from "./dom-scripting";
import {generateExamplePuzzle} from "./example-puzzle";


$(function () {
    "use strict";

    let puzzle = new Puzzle();
    let $positions = $(".position");
    let $rules = $(".rules");
    let $gameWon = $(".game-won-prompt");

    function addValue(region, value, position) {
        let result = puzzle.add(region, value, dom.convertDataPositionToArray(position));

        if (result && puzzle.isSolved()) {
            $(".game-info").addClass("show");
            $gameWon.addClass("show");
            $rules.addClass("hide");
            unregisterListeners();
        }

        return result;
    }

    generateExamplePuzzle($positions, (regionNumber, value, position) => {
        let result = puzzle.add(regionNumber, value, dom.convertDataPositionToArray(position));
        puzzle.lockRegionValue(regionNumber, value);

        return result;
    });

    $positions.on("click", dom.positionClickEvent);

    $("body").on("keyup", (ev) => {
        dom.keyUpEvent(ev, addValue, puzzle.remove.bind(puzzle));
    });

    $(".input").on("click", (ev) => {
        dom.inputClickEvent(ev, addValue, puzzle.remove.bind(puzzle));
    });

    $(".how-to-play").on("click", (ev) => {
        dom.howToPlayClickEvent(ev, $(".game-info"));
    });

    function unregisterListeners() {
        $("body").off("keyup");
        $(".input").off("click");
        $(".how-to-play").off("click");
        $positions.off("click");
    }
});
