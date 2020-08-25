export const getMaxBotForCurrentHour = (configs) => {
    if (!!configs) {
        const currentHour = new Date().getUTCHours();

        if (!!configs.hour_maxbot && configs.hour_maxbot.length > 0) {
            return configs.hour_maxbot[currentHour];
        }

        return configs.maxbot;
    }

    return 0;
};

export const convertBetChoiceName = (name) => {
    switch (name) {
        case "chan":
            return "even";
        case "le":
            return "odd";
        default:
            return name;
    }
};
