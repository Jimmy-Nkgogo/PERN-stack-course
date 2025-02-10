import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { configDotenv } from "dotenv";

configDotenv();

// init arcjet

export const aj = arcjet({
    key: process.env.ARCJECT_KEY,
    characteristics: ["ip.src"],
    rules: [
        shield({ mode: "LIVE"}), // protects app from sql injects, xss attacks
        detectBot({ mode: "LIVE",
            allow: [
                // block all bots except for search engines
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),
        // rate limiting
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10,
        })
    ]
})