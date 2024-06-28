#! /usr/bin/env node
import "source-map-support/register";

import { CommanderError } from "commander";
import { setCurrentsConfig } from "../config";
import { debug as _debug } from "../debug";
import { currentsReporter } from "../index";
import { error, info, success } from "../logger";
import { CLIManager } from "./cli-config";

require("dotenv").config();

function runScript() {
  const cliManager = new CLIManager();
  info("Currents config: %o", cliManager.parsedConfig);
  setCurrentsConfig(cliManager.parsedConfig);
  return currentsReporter();
}

runScript()
  .then(() => {
    success("Script execution finished");
    process.exit(0);
  })
  .catch((e) => {
    if (e instanceof CommanderError) {
      error(e.message);
      process.exit(e.exitCode);
    }
    error("Script execution failed:", e);
    process.exit(1);
  });
