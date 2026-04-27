import * as amplitude from '@amplitude/analytics-browser';

const amplitudeApiKey = import.meta.env.VITE_AMPLITUDE_API_KEY;

if (amplitudeApiKey) {
  amplitude.init(amplitudeApiKey, {
    autocapture: true,
    logLevel: amplitude.Types.LogLevel.Warn,
  });
}
