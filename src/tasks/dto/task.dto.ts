import { TaskStatus } from "../tasks.entity";

export class createTaskDto {
    title: string;
    description: string;
}

export class patchTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
}