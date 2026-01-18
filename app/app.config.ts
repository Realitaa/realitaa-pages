export default defineAppConfig({
  ui: {
    prose: {
      a: {
        base: [
          'text-indigo-600 dark:text-indigo-400 border-b border-transparent hover:border-indigo-600 dark:hover:border-indigo-400 font-medium focus-visible:outline-primary focus-visible:has-[>code]:outline-0 [&>code]:border-dashed hover:[&>code]:border-primary hover:[&>code]:text-primary focus-visible:[&>code]:border-primary focus-visible:[&>code]:text-primary',
          'transition-colors [&>code]:transition-colors'
        ]
      }
    },
    contentToc: {
      variants: {
        active: {
          false: {
            link: [
              'text-muted hover:text-default hvr-indigo',
              'transition-colors'
            ]
          }
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          active: true,
          class: {
            link: 'text-indigo-600 dark:text-indigo-400',
            linkLeadingIcon: 'text-indigo-600 dark:text-indigo-400'
          }
        }
      ],
    }
  }
})
