import { useI18n } from 'vue-i18n'
export const useNavList = () => {
  const { t } = useI18n()
  return [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.projects'), href: "/projects" },
    { name: t('nav.certificates'), href: "/certificates" },
    { name: t('nav.blog'), href: "/blog" },
  ]
}
