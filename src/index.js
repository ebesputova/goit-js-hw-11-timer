import { CountdownTimer } from './CountdownTimer';

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 16, 2021 20:15:00'),
});
timer.start();
