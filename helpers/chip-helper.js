export const chipList = [1000, 500, 200, 100, 50, 10, 5, 1];

export const getRandomChips = (max) => {
    let chips = [];
    let hasChip = false;

    chipList.forEach((chip) => {
        const getChip = Math.floor(max / chip);

        if (!hasChip && getChip >= 1) {
            chips.push(1);

            hasChip = true;
            max = max % chip;
        } else {
            chips.push(0);
        }
    });

    return chips;
};
