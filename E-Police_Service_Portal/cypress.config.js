// cypress.config.js
import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  video: true,

  e2e: {
    // Base URL is your frontend React app
    baseUrl: "http://localhost:5173",

    setupNodeEvents(on, config) {
      // You can add event listeners here if needed
      // Example: screenshot on test failure
      on("after:screenshot", (details) => {
        console.log("Screenshot taken:", details);
      });

      return config;
    },
  },
});   

