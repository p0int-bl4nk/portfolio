export const config = {
  NAME: 'SACHIN VERMA',
  EMAIL: 'skv860254262+pf@gmail.com',
  LINKEDIN_HANDLE: 'in/sachin-verma-l',
  get LINKEDIN_URL() {
    return `https://linkedin.com/${this.LINKEDIN_HANDLE}`;
  },
  PHONE: '+91 98278 86094',
  LOCATION: 'Gurugram, Haryana, India',
  GITHUB_HANDLE: 'p0int-bl4nk',
  get GITHUB_URL() {
    return `https://github.com/${this.GITHUB_HANDLE}`;
  },
  get SOURCE_URL() {
    return `${this.GITHUB_URL}/portfolio`;
  },
} as const;
