import { Injectable } from '@nestjs/common';
import { patchTaskDto } from './dto/task.dto';
import { Task, TaskStatus } from './tasks.entity';

@Injectable()
export class TasksService {
    private tasks: Task[] = [{
        id: "1",
        title: 'Task 1',
        description: 'Description 1',
        status: TaskStatus.OPEN,
    }, {
        id: "2",
        title: 'Task 2',
        description: 'Description 2',
        status: TaskStatus.IN_PROGRESS,
    }, {
        id: "3",
        title: 'Task 3',
        description: 'Description 3',
        status: TaskStatus.DONE,
    }];

    getAllTasks() {
        return this.tasks
    }

    createTask(title: string, description: string) {
        const task: Task = {
            id: this.tasks.length + "1",
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    deleteTaskById(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks;
    }

    updateTaskById(id: string, updatedFields: patchTaskDto): Task {
        const task = this.getTaskById(id);
        if (!task) return null;
        const newaTask = { ...task, ...updatedFields };
        this.tasks = this.tasks.map(task => task.id === id ? newaTask : task);
        return newaTask;
    }
}
