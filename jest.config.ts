import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  testEnvironment: 'jsdom',
 transform: {
  '^.+\\.tsx?$': [
    'ts-jest',
    {
      tsconfig: {
        module: 'CommonJS',
        moduleResolution: 'node',
        verbatimModuleSyntax: false,
        esModuleInterop: true,
        jsx: 'react-jsx',
      },
    },
  ],
},
};

export default config;