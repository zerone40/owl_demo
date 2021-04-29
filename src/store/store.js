export const actions = {
    addTask({ state }, new_task) {
        if (new_task) {
            const task = {
                id: state.nextId++,
                label: new_task,
                isCompleted: false,
            };
            state.tasks.push(task);
        }
    },
    toggleTask({ state }, id) {
        const task = state.tasks.find((t) => t.id === id);
        task.isCompleted = !task.isCompleted;
    },
    deleteTask({ state }, id) {
        const index = state.tasks.findIndex((t) => t.id === id);
        state.tasks.splice(index, 1);
    },
};

export const initialState = {
    nextId: 1,
    tasks: [],
};