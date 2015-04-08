let selectedPosition;

let keys = {
    49: 1, 50: 2, 51: 3, 52: 4, 53: 5,
    54: 6, 55: 7, 56: 8, 57: 9
};

export function convertDataPositionToArray(dataPosition) {
    return dataPosition.split(",").map(function (point) { return parseInt(point, 10) });
}

function animateResult(result) {
    "use strict";

    selectedPosition.removeClass("success");
    selectedPosition.removeClass("fail");

    if (result !== null) {
        let correspondingResultClass = result ? "success" : "fail";

        selectedPosition.addClass(correspondingResultClass);

        return result;
    }

    return false;
}

export function keyUpEvent(ev, addValueCallback) {
    "use strict";

    if (selectedPosition) {
        let keyCode = ev.keyCode;

        if (keyCode >= 49 && keyCode <= 57) {
            let regionNumber = selectedPosition.data("region");
            let value = keys[keyCode];
            let position = selectedPosition.data("position");

            // Add to puzzle structure before modifying the DOM
            let success = animateResult(addValueCallback(regionNumber, value, position));

            if (success) {
                selectedPosition.text(value);
            }
        }
    }
}

export function positionClickEvent(ev) {
    "use strict";

    if (selectedPosition) {
        selectedPosition.removeClass("selected");
    }

    selectedPosition = $(ev.target);
    selectedPosition.addClass("selected");
}

export function inputClickEvent(ev, addValueCallback, removeCallback) {
    "use strict";

    if (selectedPosition) {
        let $input = $(ev.target);
        let regionNumber = selectedPosition.data("region");
        let value = $input.text();

        if ($input && $input.hasClass("remove")) {
            let success = removeCallback(regionNumber, selectedPosition.text());

            if (success) {
                animateResult();
                selectedPosition.text("");
            }
        } else {
            let position = selectedPosition.data("position");
            let success = animateResult(addValueCallback(regionNumber, value, position));

            if (success) {
                selectedPosition.text(value);
            }
        }

    }
}

export function howToPlayClickEvent(ev, $htmlElement) {
    "use strict";
    ev.preventDefault();

    $htmlElement.toggleClass("show");
}