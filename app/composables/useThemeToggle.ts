const colorMode = useColorMode()

export const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

export const isDark = computed(() => colorMode.value === 'dark')