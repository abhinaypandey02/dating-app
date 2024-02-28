import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/graphql`,
  documents: ['./app/**/*.ts*', './components/**/*.ts*', './lib/**/*.ts*'],
  generates: {
    './__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
