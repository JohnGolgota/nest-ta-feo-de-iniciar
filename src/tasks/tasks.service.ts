import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.entity';

@Injectable()
export class TasksService {
    private tasks: Task[] = [{
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        status: TaskStatus.OPEN,
    }, {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
        status: TaskStatus.IN_PROGRESS,
    }, {
        id: 3,
        title: 'Task 3',
        description: 'Description 3',
        status: TaskStatus.DONE,
    }];

    getAllTasks() {
        return this.tasks
    }

    createTask(title: string, description: string) {
        const task: Task = {
            id: this.tasks.length + 1,
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    getTaskById(id: number) {
        return this.tasks.find(task => task.id === id);
    }

    deleteTaskById(id: number) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTaskById(id: number, title: string, description: string, status: string) {
        const task = this.getTaskById(id);
        task.title = title;
        task.description = description;
        // task.status = status;
        return task;
    }
}
