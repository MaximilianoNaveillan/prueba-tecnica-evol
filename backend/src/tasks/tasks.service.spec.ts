import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  async getAll(): Promise<Task[]> {
    return this.taskRepo.find();
  }

  async create(task: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepo.create(task);
    return this.taskRepo.save(newTask);
  }

  async update(id: number, task: Partial<Task>): Promise<Task> {
    await this.taskRepo.update(id, task);
    return this.taskRepo.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.taskRepo.delete(id);
  }
}
