export const useHowIBuildProducts = () => {
  return computed(() => [
    { key: 'card1', icon: 'simple-line-icons:layers' },
    { key: 'card2', icon: 'ph:head-circuit-light' },
    { key: 'card3', icon: 'carbon:settings-check' },
  ])
}