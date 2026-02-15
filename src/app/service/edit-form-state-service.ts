import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditFormStateService {
  private focusedComponentId = signal<string | null>(null)

  changeFocus(id: string | null) {
    if (this.focusedComponentId() !== id) {
      this.focusedComponentId.set(id)
    }
  }

  isFocused(componentId: string) {
    return this.focusedComponentId() === componentId
  }
}
