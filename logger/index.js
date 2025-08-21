import { init, captureException, captureMessage, setTag, httpIntegration, mongooseIntegration } from "@sentry/node";

let identifier = "";

const sentryLogger = {
    start: ({ sentryUrl = "", env = "", sentryRelease = "", logIdentifier = "", tracesSampleRate = 0.1, mongooseTrace = true }) => {
        let traceIntegrations = [httpIntegration({ ignoreStaticAssets: true })];

        if (mongooseTrace) {
            traceIntegrations.push(mongooseIntegration());
        }

        init({
            dsn: sentryUrl,
            maxValueLength: 5000,
            environment: env,
            release: sentryRelease ? "game-server@" + sentryRelease : "",
            integrations: traceIntegrations,
            tracesSampleRate,
        });
        identifier = logIdentifier;

        setTag("game_service", logIdentifier);
        captureMessage(`Logger started at ${new Date()}`);
    },

    log: (message, level = "info") => {
        const messageLog = typeof message === "string" || message instanceof String ? message : JSON.stringify(message);

        if (messageLog == "{}") {
            return;
        }

        captureMessage(messageLog, level);
    },

    logWarning: (message) => {
        sentryLogger.log(identifier + " " + message, "warning");
    },

    logCritical: (message) => {
        let messageLog = typeof message === "string" || message instanceof String ? message : "";

        if (message.message) {
            messageLog += message.message;
        }

        if (message.stack) {
            messageLog += "\nstack: " + message.stack;
        }

        sentryLogger.log(identifier + " " + messageLog, "critical");
    },

    logError: (exception) => {
        if (
            typeof exception === "string" ||
            exception instanceof String ||
            (exception && exception.message == null && exception.stack == null)
        ) {
            sentryLogger.log(identifier + " " + exception, "error");
        } else {
            if (!exception) {
                exception = `Exception is null at ${new Date()}`;
            }

            captureException(exception);
        }
    },

    composeBeforeCallMessage: (session, params) => {
        try {
            const characterName = session && session.characterName ? `\n\tCharacter: ${session.characterName} ` : "";
            return `Before Action at ${new Date()}: \n\tSession: ${JSON.stringify(session)} ${characterName}\n\tParams:${JSON.stringify(
                params
            )}`;
        } catch (error) {
            sentryLogger.logError(error);
        }

        return "";
    },
    logAfterSendToApi: (action, params, result, beforeMessage, logLevel, enabledApiLog) => {
        if (enabledApiLog) {
            const messages = [
                `Account ${params.SiteId}_${params.PlayerId} performs ${action} at ${new Date()}`,
                "",
                beforeMessage,
                `\nAction Result: ${JSON.stringify(result)}`,
            ];

            const joinedMessages = messages.join("\n");
            captureMessage(joinedMessages, logLevel);
        }
    },

    setTag: (tag) => {
        if (tag) {
            try {
                Sentry.withScope(function (scope) {
                    scope.setTag(tag.id, tag.value);
                });
            } catch (ex) {
                console.log(ex);
            }
        }
    },
};

export default sentryLogger;
