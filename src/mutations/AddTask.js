import gql from 'graphql-tag'
export default gql `
  mutation addTask($id: ID!, $name: String!, $completed: Boolean!) {
    createTask(
      input: {
        id: $id, name: $name, completed: $completed
      }
    ) {
        id
        name
        completed
      }
  }`
