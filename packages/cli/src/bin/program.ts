import { Command } from "@commander-js/extra-typings";
import chalk from "chalk";

import { reporterVersion } from "../env/versions";
import { dim } from "../logger";
import {
  ciBuildIdOption,
  debugOption,
  disableTitleTagsOption,
  inspectOption,
  machineIdOption,
  projectOption,
  recordKeyOption,
  removeTagOption,
  reportDirOption,
  tagOption,
} from "./options";

type CurrentsReporterCommand = Partial<
  ReturnType<ReturnType<typeof getCurrentsReporterCommand>["opts"]>
>;

export const getProgram = (
  command: Command<[], CurrentsReporterCommand> = getCurrentsReporterCommand()
) => command.version(reporterVersion);

const currentsReporterExample = `
----------------------------------------------------
📖 Documentation: https://docs.currents.dev
🤙 Support:       support@currents.dev
----------------------------------------------------

${chalk.bold("Examples")}

Upload report to currents dashboard:
${dim("currents-reporter --key <record-key> --project-id <id> --ci-build-id <build-id>")}

Upload report to currents dashboard add tags "tagA", "tagB" to the recorded run:
${dim(
  "currents-reporter --key <record-key> --project-id <id> --ci-build-id <build-id> --tag tagA --tag tagB"
)}

Provide a custom path to the report directory:
${dim(
  "currents-reporter --key <record-key> --project-id <id> --ci-build-id <build-id> -- --workers 2 --timeout 10000 --shard 1/2"
)}
`;

export const getCurrentsReporterCommand = () => {
  return new Command()
    .name("currents-reporter")
    .usage("[options]")
    .allowUnknownOption()
    .showHelpAfterError("(add --help for additional information)")
    .description(
      `Report upload utility for https://currents.dev
${currentsReporterExample}`
    )
    .addOption(ciBuildIdOption)
    .addOption(recordKeyOption)
    .addOption(projectOption)
    .addOption(tagOption)
    .addOption(removeTagOption)
    .addOption(disableTitleTagsOption)
    .addOption(machineIdOption)
    .addOption(inspectOption)
    .addOption(debugOption)
    .addOption(reportDirOption);
};
