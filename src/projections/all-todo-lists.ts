import { Projection } from '../event-store/projections';

interface AllTodoLists {
  allTodoLists: { id: string, name: string }[];
}

const projection: Projection<AllTodoLists> = {

    $init() {
      return { allTodoLists: [] };
    },
    onTodoListCreatedEvent({ allTodoLists }, event: any) {
      return { allTodoLists: [...allTodoLists, event] };
    }

  };

export default projection;