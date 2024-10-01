// src/mocks/browser.js
// https://mswjs.io/docs/integrations/browser
// https://mswjs.io/docs/getting-started
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
