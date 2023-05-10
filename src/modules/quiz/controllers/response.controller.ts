import { Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { events } from '../../../common/constants/event.constants';
import { ResponseAddEvent } from '../events/response-add.event';

@Controller('response')
export class ResponseController {
  constructor(private eventEmitter: EventEmitter2) {}

  @Post('')
  async handleQuestionResponse() {
    this.eventEmitter.emit(
      events.RESPONSE_SUBMITTED,
      new ResponseAddEvent(1, 33),
    );

    return {
      message: 'Response taken',
    };
  }
}
