import numeral from "numeral";

export const formatNumberWithComma = (number) => {
    return numeral(number).format("0,0");
};

export const getRandomNumberStep5 = (min, max, isUseChips) => {
    let randomAmount = Math.floor(Math.random() * max) + min;

    if (randomAmount <= 20 && !isUseChips) {
        return randomAmount;
    }

    let step;

    if (randomAmount < 50) {
        step = 5;
    } else if (randomAmount < 100) {
        step = 10;
    } else if (randomAmount < 1000) {
        step = 50;
    } else {
        step = 100;
    }

    step = step < min ? min : step;

    let number = Math.floor(randomAmount / step) * step;

    if (number < min) {
        number = min;
    }

    return number;
};
