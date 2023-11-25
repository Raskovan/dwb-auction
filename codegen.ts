import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [{
    'https://secure-bayou-87301-79d4527ad2ec.herokuapp.com/': {
      headers: {
        "X-API-key": "zrcbpAcaRvB3.deW6dXP"
      }
    }
  }],
  documents: ['src/**/*.tsx', 'src/**/*.ts', '!src/gql/**/*'],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;