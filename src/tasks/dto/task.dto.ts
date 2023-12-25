import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { TaskStatus } from "../tasks.entity";

export class createTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string;
    @IsString()
    description: string;
}

export class patchTaskDto {
    @IsString()
    @IsOptional()
    title?: string;
    @IsString()
    @IsOptional()
    description?: string;
    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
}