define(['ko', 'uiCollection', 'uiLayout', 'uiRegistry'], (
  ko,
  uiCollection,
  uiLayout,
  uiRegistry
) => {
  'use strict';

  return uiCollection.extend({
    defaults: {
      template: 'Magento_Theme/todo',
      todos: [],
      url: 'https://jsonplaceholder.typicode.com/todos',
      tracks: {
        todos: true,
      },
      listens: {
        todos: 'renderTodos',
      },
      statefull: {
        todos: true,
      },
    },

    initialize() {
      this._super();
      this.fetchTodos();

      return this;
    },

    async fetchTodos() {
      if (this.todos?.length) {
        return this.renderTodos();
      }
    },

    renderTodos() {
      if (this.elems()?.length) {
        this.destroyChildren();
      }

      uiLayout([
        ...this.todos.map(todo => {
          return {
            component: 'Magento_Theme/js/view/todo/item',
            name: `todo-${todo.id}`,
            parent: this.name,
            deps: ['todo-modal'],
            id: todo.id,
            title: todo.title,
          };
        }),
      ]);
    },

    add() {
      uiRegistry.get('todo-modal').add();
    },

    createTodo(item) {
      try {
        this.todos.push({
          id: window.crypto.randomUUID(),
          ...item,
        });

        return true;
      } catch (exception) {
        return false;
      }
    },

    findTodoById(id) {
      return this.todos.find(todo => todo.id === id);
    },

    findTodoByIdAndUpdate(id, item) {
      const index = this.todos.findIndex(todo => {
        return todo.id === id;
      });

      if (index < 0) {
        return false;
      }

      this.todos[index] = {
        ...this.todos[index],
        ...item,
      };
      ko.getObservable(this, 'todos').valueHasMutated();

      return true;
    },
  });
});
