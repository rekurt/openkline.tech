// Single source of truth for project identity, packages, URLs and contacts.
// Every component imports from here — no hardcoding these values elsewhere.

export const PROJECT = {
  name: 'openkline',
  license: 'MIT',

  packages: {
    core: '@rekurt/openkline-core',
    react: '@rekurt/openkline-react',
    vue: '@rekurt/openkline-vue',
  },

  install: {
    core: 'npm install @rekurt/openkline-core',
    react: 'npm install @rekurt/openkline-react',
    vue: 'npm install @rekurt/openkline-vue',
  },

  repo: 'https://github.com/rekurt/openkline',
  repoOrg: 'rekurt',
  repoName: 'openkline',

  urls: {
    github: 'https://github.com/rekurt/openkline',
    issues: 'https://github.com/rekurt/openkline/issues',
    releases: 'https://github.com/rekurt/openkline/releases',
    sponsors: 'https://github.com/sponsors/rekurt',
  },

  contacts: {
    email: 'nikitageek@gmail.com',
    telegram: '@nikita_rwhe',
    telegramUrl: 'https://t.me/nikita_rwhe',
    githubProfile: 'https://github.com/rekurt',
  },

  site: 'https://openkline.tech',
};
