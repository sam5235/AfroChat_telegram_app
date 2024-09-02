import { useWebApp } from "@vkruglikov/react-telegram-web-app";

const useTelegramTheme = () => {
  const webApp = useWebApp();

  const isDarkMode = () => {
    const bgColor = webApp.themeParams?.bg_color;

    // Determine if bgColor is dark or light
    if (bgColor) {
      // Convert bgColor (which is a hex string) to an integer
      const colorValue = parseInt(bgColor.replace("#", ""), 16);

      // Calculate brightness using a standard formula
      const brightness =
        (colorValue >> 16) * 0.299 +
        ((colorValue >> 8) & 0xff) * 0.587 +
        (colorValue & 0xff) * 0.114;

      // Brightness less than 128 is generally considered dark
      return brightness < 128;
    }

    return false; // Default to light mode if no bg_color is available
  };
  return isDarkMode;
};

export default useTelegramTheme;
