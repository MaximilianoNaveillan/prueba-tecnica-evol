import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            getAll: jest
              .fn()
              .mockResolvedValue([
                { id: 1, title: 'Task 1', completed: false },
              ]),
            create: jest.fn().mockResolvedValue({
              id: 1,
              title: 'Task 2',
              completed: false,
            }),
            update: jest.fn().mockResolvedValue({
              id: 1,
              title: 'Task 3',
              completed: true,
            }),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  it('should return all tasks', async () => {
    const result = await tasksController.getAll();
    expect(result).toEqual([{ id: 1, title: 'Test Task', completed: false }]);
  });

  it('should create a task', async () => {
    const newTask = {
      title: 'Test Task',
      description: 'A test task',
      completed: false,
    };
    const result = await tasksController.create(newTask);
    expect(result).toEqual({ id: 1, title: 'Test Task', completed: false });
  });

  it('should update a task', async () => {
    const updatedTask = { title: 'Updated Task', completed: true };
    const result = await tasksController.update('1', updatedTask);
    expect(result).toEqual({ id: 1, title: 'Updated Task', completed: true });
  });

  it('should delete a task', async () => {
    await tasksController.delete('1');
    expect(tasksService.delete).toHaveBeenCalledWith(1);
  });
});
