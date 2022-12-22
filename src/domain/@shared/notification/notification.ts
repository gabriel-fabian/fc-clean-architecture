export type NotificationError = {
  message: string
  context: string
}

export class Notification {
  private readonly errors: NotificationError[] = []

  addError (error: NotificationError): void {
    this.errors.push(error)
  }

  messages (context?: string): string {
    return this.errors
      .filter((error) => context === undefined || error.context === context)
      .map((error) => `${error.context}: ${error.message}`)
      .join(',')
  }
}
