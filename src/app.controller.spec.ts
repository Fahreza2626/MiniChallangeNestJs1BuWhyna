import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('checkBilangan', () => {
    it('should return bilangan 12 dengan benar', () => {
      expect(appController.checkBilangan('12')).toEqual({
        angka: 12,
        jenis: 'genap',
        kuadrat: 144,
        kelipatanLima: false,
      });
    });
  });
});