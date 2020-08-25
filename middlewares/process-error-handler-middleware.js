import logger from "./../logger";

export const terminate = (options = { coredump: false, timeout: 500 }) => {
    // Exit function
    const exit = (code) => {
        options.coredump ? process.abort() : process.exit(code);
    };

    return (server, code, reason) => (err, promise) => {
        if (err && err instanceof Error) {
            // Log error information, use a proper logging library here :)
            logger.logError(err);
            console.log(err.message, err.stack);
        }

        // Attempt a graceful shutdown
        server.close(exit);
        setTimeout(exit, options.timeout).unref();
    };
};

export const exitHandler = terminate({
    coredump: false,
    timeout: 500,
});

export const handle = (server, process) => {
    process.on("exit", () => {
        logger.logError("server is stopped!!!!");
        console.log("Exit happened!");
    });
    process.on("uncaughtException", exitHandler(server, 1, "Unexpected Error"));
    process.on("unhandledRejection", exitHandler(server, 1, "Unhandled Promise"));
    process.on("SIGTERM", exitHandler(server, 0, "SIGTERM"));
    process.on("SIGINT", exitHandler(server, 0, "SIGINT"));
};
