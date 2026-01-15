export const useTechStack = () => {
  const columnHeader = ['Language', 'Frontend', 'Backend', 'Fullstack', 'Cloud', 'Infrastructure', 'Tools'];
  const content = [
    // Language
    {
      "PHP": {
        label: "PHP",
        icon: "logos:php",
        description: "Start from PHP 8.0",
        link: "https://php.net"
      },
      "JavaScript": {
        label: "JavaScript",
        icon: "logos:javascript",
        description: "Start from JavaScript ES6",
        link: "https://javascript.info"
      },
      "TypeScript": {
        label: "TypeScript",
        icon: "logos:typescript-icon",
        description: "Start from TypeScript",
        link: "https://www.typescriptlang.org"
      },
      "Python": {
        label: "Python",
        icon: "logos:python",
        description: "Start from Python 3.10",
        link: "https://www.python.org"
      }
    },
    // Frontend
    {
      "Tailwind CSS": {
        label: "Tailwind CSS",
        icon: "devicon:tailwindcss",
        description: "Start from Tailwind CSS 4.x",
        link: "https://tailwindcss.com"
      },
      "Bootstrap": {
        label: "Bootstrap",
        icon: "logos:bootstrap",
        description: "Start from Bootstrap 5.x",
        link: "https://getbootstrap.com"
      },
      "Alpine.js": {
        label: "Alpine.js",
        icon: "skill-icons:alpinejs-light",
        description: "Start from Alpine.js 3.x",
        link: "https://alpinejs.dev"
      },
      "Vue.js": {
        label: "Vue.js",
        icon: "logos:vue",
        description: "Start from Vue.js 3.x and Composition API only",
        link: "https://vuejs.org"
      },
      "Livewire": {
        label: "Livewire",
        icon: "devicon:livewire",
        description: "Start from Livewire 3.x",
        link: "https://livewire.laravel.com"
      }
    },
    // Backend
    {
      "Hapi.js": {
        label: "Hapi.js",
        icon: "logos:hapi",
        description: "Start from Hapi.js 21.x",
        link: "https://hapi.dev"
      },
      "Express.js": {
        label: "Express.js",
        icon: "skill-icons:expressjs-light",
        description: "Start from Express.js 5.x",
        link: "https://expressjs.com"
      }
    },
    // Fullstack
    {
      "Nuxt.js": {
        label: "Nuxt.js",
        icon: "devicon:nuxt",
        description: "Start from Nuxt.js 4.x",
        link: "https://nuxt.com"
      },
      "Laravel": {
        label: "Laravel",
        icon: "logos:laravel",
        description: "Start from Laravel 12.x",
        link: "https://laravel.com"
      },
      "CodeIgniter": {
        label: "CodeIgniter",
        icon: "logos:codeigniter-icon",
        description: "Start from CodeIgniter 4.5",
        link: "https://codeigniter.com"
      }
    },
    // Cloud
    {
      "AWS": {
        label: "AWS",
        icon: "skill-icons:aws-light",
        description: "Start from AWS 1.x",
        link: "https://aws.amazon.com"
      },
      "GCP": {
        label: "GCP",
        icon: "material-icon-theme:gcp",
        description: "Start from GCP 1.x",
        link: "https://cloud.google.com"
      },
      "Cloudflare": {
        label: "Cloudflare",
        icon: "devicon:cloudflare",
        description: "Start from Cloudflare 1.x",
        link: "https://cloudflare.com"
      },
      "Supabase": {
        label: "Supabase",
        icon: "devicon:supabase",
        description: "Start from Supabase 1.x",
        link: "https://supabase.com"
      },
      "Unsplash": {
        label: "Unsplash",
        icon: "pixel:unsplash",
        description: "Start from Unsplash 1.x",
        link: "https://unsplash.com"
      }
    },
    // Infrastructure
    {
      "Redis": {
        label: "Redis",
        icon: "logos:redis",
        description: "Start from Redis 1.x",
        link: "https://redis.io"
      },
      "RabbitMQ": {
        label: "RabbitMQ",
        icon: "devicon:rabbitmq",
        description: "Start from RabbitMQ 1.x",
        link: "https://rabbitmq.com"
      },
      "Netlify": {
        label: "Netlify",
        icon: "material-icon-theme:netlify",
        description: "Start from Netlify 1.x",
        link: "https://netlify.com"
      }
    },
    // Tools
    {
      "Git": {
        label: "Git",
        icon: "logos:git-icon",
        description: "Start from Git 1.x",
        link: "https://git-scm.com"
      },
      "GitHub": {
        label: "GitHub",
        icon: "meteor-icons:github",
        description: "Start from GitHub 1.x",
        link: "https://github.com"
      },
      "Postman": {
        label: "Postman",
        icon: "logos:postman-icon",
        description: "Start from Postman 1.x",
        link: "https://postman.com"
      },
      "Dbeaver": {
        label: "Dbeaver",
        icon: "devicon:dbeaver",
        description: "Start from Dbeaver 1.x",
        link: "https://dbeaver.io"
      },
      "Colab": {
        label: "Colab",
        noIcon: true,
        source: "https://assets.realitaa.dev/img/colab.png",
        description: "Start from Colab 1.x",
        link: "https://colab.research.google.com"
      }
    }
  ]
  return {
    columnHeader,
    content
  }
}