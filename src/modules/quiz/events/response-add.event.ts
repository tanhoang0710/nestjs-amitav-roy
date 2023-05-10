export class ResponseAddEvent {
  userId: number;
  optionId: number;

  constructor(userId: number, optionId: number) {
    (this.optionId = optionId), (this.userId = userId);
  }
}
