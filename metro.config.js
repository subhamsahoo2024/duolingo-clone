const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Intercept Zustand imports to force the CommonJS entry point and bypass 'import.meta' issues
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "zustand" || moduleName.startsWith("zustand/")) {
    return {
      filePath: require.resolve(moduleName),
      type: "sourceFile",
    };
  }
  // Fall back to default Metro/Expo resolution for all other packages
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativewind(config);
