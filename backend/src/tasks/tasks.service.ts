import { Injectable, NotFoundException } from '@nestjs/common'; // Importa NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // Método para obtener todas las tareas
  async getAll(): Promise<Task[]> {
    return this.tasksRepository.find(); // Devuelve todas las tareas de la base de datos
  }

  // Método para crear una nueva tarea
  async create(task: Partial<Task>): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  // Método para actualizar una tarea existente
  async update(id: number, task: Partial<Task>): Promise<Task> {
    const taskToUpdate = await this.tasksRepository.findOne({
      where: { id }, // Usamos la nueva sintaxis de findOne
    });

    if (!taskToUpdate) {
      throw new NotFoundException(`Task with id ${id} not found`); // Lanza error si no existe la tarea
    }

    // Actualizamos la tarea
    await this.tasksRepository.update(id, task);

    // Después de la actualización, simplemente devolvemos la tarea con los cambios aplicados
    return { ...taskToUpdate, ...task }; // Devuelve la tarea actualizada con los cambios
  }

  // Método para eliminar una tarea
  async delete(id: number): Promise<void> {
    const taskToDelete = await this.tasksRepository.findOne({
      where: { id },
    });

    if (!taskToDelete) {
      throw new NotFoundException(`Task with id ${id} not found`); // Lanza error si no existe la tarea
    }

    await this.tasksRepository.delete(id);
  }
}
