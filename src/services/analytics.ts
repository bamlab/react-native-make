import ua from 'universal-analytics';
import { Config } from '@react-native-community/cli';

const analytics = ua('UA-145385834-2');

interface ConfigCommandTask {
  (argv: string[], config: Config, args: Record<string, any>): Promise<void>;
}

export const trackTask = (pageName: string, task: ConfigCommandTask) => (
  argv: string[],
  config: Config,
  args: Record<string, any>
): ReturnType<ConfigCommandTask> => {
  analytics.pageview(pageName).send();
  return task(argv, config, args);
};
