import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://secure-bayou-87301-79d4527ad2ec.herokuapp.com/',
  documents: ['src/**/*.tsx', 'src/**/*.ts', '!src/gql/**/*'],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;