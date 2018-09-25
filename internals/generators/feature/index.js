/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a feature component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the base component type:',
      default: 'Stateless Function',
      choices: () => [
        'Stateless Function',
        'React.PureComponent',
        'React.Component',
      ],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Login',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or feature with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'input',
      name: 'component',
      message: 'What should it be called?',
      default: 'Form',
    },
    {
      type: 'confirm',
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?',
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message:
        'Do you want an actions/constants/selectors/reducer tuple for this feature?',
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: 'Do you want to load resources asynchronously?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    var componentTemplate; // eslint-disable-line no-var

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './feature/stateless.js.hbs';
        break;
      }
      default: {
        componentTemplate = './feature/class.js.hbs';
      }
    }

    const actions = [
      {
        type: 'add',
        path: '../../app/features/{{properCase name}}/index.js',
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/features/{{properCase name}}/tests/index.test.js',
        templateFile: './feature/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../app/features/{{properCase name}}/messages.js',
        templateFile: './feature/messages.js.hbs',
        abortOnFail: true,
      });
    }

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: '../../app/features/{{properCase name}}/actions.js',
        templateFile: './feature/actions.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/features/{{properCase name}}/tests/actions.test.js',
        templateFile: './feature/actions.test.js.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: '../../app/features/{{properCase name}}/constants.js',
        templateFile: './feature/constants.js.hbs',
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: 'add',
        path: '../../app/features/{{properCase name}}/selectors.js',
        templateFile: './feature/selectors.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/features/{{properCase name}}/tests/selectors.test.js',
        templateFile: './feature/selectors.test.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: '../../app/features/{{properCase name}}/reducer.js',
        templateFile: './feature/reducer.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/features/{{properCase name}}/tests/reducer.test.js',
        templateFile: './feature/reducer.test.js.hbs',
        abortOnFail: true,
      });
    }

    // Sagas
    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path: '../../app/features/{{properCase name}}/saga.js',
        templateFile: './feature/saga.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/features/{{properCase name}}/tests/saga.test.js',
        templateFile: './feature/saga.test.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../app/features/{{properCase name}}/Loadable.js',
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    // Components
    switch (data.type) {
      case 'Stateless Function': {
        actions.push({
          type: 'add',
          path:
            '../../app/features/{{properCase name}}/components/{{properCase component}}/index.js',
          templateFile: './feature/stateless-component.js.hbs',
          abortOnFail: true,
        });
        break;
      }
      default: {
        actions.push({
          type: 'add',
          path:
            '../../app/features/{{properCase name}}/components/{{properCase component}}/index.js',
          templateFile: './feature/class-component.js.hbs',
          abortOnFail: true,
        });
      }
    }
    actions.push({
      type: 'add',
      path:
        '../../app/features/{{properCase name}}/components/{{properCase component}}/tests/index.test.js',
      templateFile: './feature/test-component.js.hbs',
      abortOnFail: true,
    });
    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path:
          '../../app/features/{{properCase name}}/components/{{properCase component}}/messages.js',
        templateFile: './feature/messages-component.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/features/',
    });

    return actions;
  },
};
