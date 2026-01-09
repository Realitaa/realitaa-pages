import { computed } from "vue"

export const useThemeToggle = () => {
  const colorMode = useColorMode()

  const toggleTheme = () => {
    colorMode.preference =
      colorMode.value === "dark" ? "light" : "dark"
  }

  const isDark = computed(() => colorMode.value === "dark")

  return {
    toggleTheme,
    isDark,
    colorMode,
  }
}
