import { defineConfig } from "cypress";

declare const require: any;

const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const { pa11y } = require("@cypress-audit/pa11y");

export default defineConfig({
	e2e: {
		baseUrl: "http://localhost:3000",
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		setupNodeEvents(on, config) {
			// implement node event listeners here
			on("before:browser:launch", (browser, launchOptions) => {
				prepareAudit(launchOptions);
			});

			on("task", {
				lighthouse: lighthouse(),
				pa11y: pa11y(console.log.bind(console))
			});
		}
	}
});
