import { Config, UserDependencyConfig } from '@react-native-community/cli';

interface CompatibilityCommand {
  name: string;
  description?: string;
  func: (argv: string[], ctx: Config, args: Record<string, string>) => Promise<void>;
  options?: Array<{
    command: string;
    description?: string;
    parse?: (val: string) => any;
    default?: string | boolean | number | ((ctx: Config) => string | boolean | number);
  }>;
  examples?: Array<{
    desc: string;
    cmd: string;
  }>;
}

export const createBackwardCompatibleConfig = (
  config: UserDependencyConfig
): Array<CompatibilityCommand> => {
  const commands = config.commands;

  return commands.map(command => ({
    ...command,
    options: command.options.map(option => ({
      ...option,
      name: undefined,
      command: option.name,
    })),
  }));
};
