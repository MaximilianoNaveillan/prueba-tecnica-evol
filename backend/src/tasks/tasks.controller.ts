import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get() // Este método responderá a las peticiones GET en '/tasks'
  getAll(): Promise<Task[]> {
    return this.tasksService.getAll(); // Llama al servicio para obtener todas las tareas
  }

  @Post() // Este método responderá a las peticiones POST en '/tasks'
  create(@Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.create(task); // Llama al servicio para crear una nueva tarea
  }

  @Put(':id') // Este método responderá a las peticiones PUT en '/tasks/:id'
  update(@Param('id') id: string, @Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.update(+id, task); // Llama al servicio para actualizar la tarea por ID
  }

  @Delete(':id') // Este método responderá a las peticiones DELETE en '/tasks/:id'
  delete(@Param('id') id: string): Promise<void> {
    return this.tasksService.delete(+id); // Llama al servicio para eliminar la tarea por ID
  }
}
