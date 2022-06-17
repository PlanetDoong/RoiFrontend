import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        path: '/',
        screens: {
          Home: 'home',
          People: {
            path: 'people',
            screens: {
              ViewPeople: 'view-all',
              ViewPerson: 'view',
              EditPerson: 'edit',
            }
          },
          AppPerson: 'people/add',
          Help: 'help',
        },
      },
      NotFound: '*', // catch-all route (404 resource not found)
    },
  },
};
