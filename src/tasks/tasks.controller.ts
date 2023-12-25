import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { createTaskDto, patchTaskDto } from './dto/task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {

    }

    // /tasks
    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    // /tasks
    @Post()
    createTask(@Body() body: createTaskDto) {
        return this.tasksService.createTask(body.title, body.description);
    }

    // /tasks/:id
    @Delete(":id")
    deleteTaskById(@Param('id') id: string) {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch(":id")
    updateTaskById(@Param('id') id: string, @Body() body: patchTaskDto) {
        const task = this.tasksService.updateTaskById(id, body);
        if (!task) return "Task not found";
        return task;
    }

}
