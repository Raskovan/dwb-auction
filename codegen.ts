import { CodegenConfig } from '@graphql-codegen/cli';

// const API_URL: string = (process.env.REACT_APP_API_URL as string)
const API_KEY: string = (process.env.REACT_APP_API_KEY as string)

const config: CodegenConfig = {
  schema: [{
    'https://secure-bayou-87301-79d4527ad2ec.herokuapp.com': {
      headers: {
        "X-API-key": API_KEY
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