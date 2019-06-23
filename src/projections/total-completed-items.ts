import { Projection } from '../event-store/projections';


interface CompletedItems {
  completed: number;
}

const projection: Projection<CompletedItems> = {

    $init() {
      return { completed: 0 }
    },
    onTodoItemCompletedEvent({ completed }) {
      return { completed: completed + 1}
    }

  };

export default projection;