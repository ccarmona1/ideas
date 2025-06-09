function processUserConfiguration(config) {
  const processedConfig = {
    baseSetting: config.baseSetting || "default",
    featureEnabled: config.featureEnabled === true,
    adminTools: null,
    moderationTools: null,
    adminTools:
      config.accessLevel === "admin" || config.accessLevel === "moderator"
        ? true
        : null,
    userId: config.customIdentifier
      ? config.customIdentifier.toUpperCase()
      : null,
    defaultId: !config.customIdentifier
      ? Math.random().toString(36).substring(7)
      : null,
    logLevel: config.accessLevel === "admin" ? "DEBUG" : null,
  };

  return processedConfig;
}

const configs = [
  {
    baseSetting: "alpha",
    customIdentifier: null,
    featureEnabled: true,
    accessLevel: "user",
    extraProperty: null,
  },
  {
    baseSetting: "beta",
    customIdentifier: null,
    featureEnabled: false,
    accessLevel: "admin",
    extraProperty: null,
  },
  {
    baseSetting: "gamma",
    customIdentifier: "abc",
    featureEnabled: null,
    accessLevel: "moderator",
    extraProperty: null,
  },
  {
    baseSetting: "delta",
    customIdentifier: null,
    featureEnabled: true,
    accessLevel: "user",
    extraProperty: "ignored",
  },
  {
    baseSetting: null,
    customIdentifier: null,
    featureEnabled: true,
    accessLevel: "admin",
    extraProperty: null,
  },
];

configs.forEach((config) => processUserConfiguration(config));
