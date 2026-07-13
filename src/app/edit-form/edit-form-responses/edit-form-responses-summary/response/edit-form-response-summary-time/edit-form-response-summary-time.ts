import {Component, OnInit, signal} from '@angular/core';
import {DatePipe} from "@angular/common";
import {EditFormResponseSummaryComponent} from '../../../../../type/edit-form-response-summary-component';
import {TimeResponseSummaryRes} from '../../../../../model/edit-form/responses/summary/time-response-summary-res';

@Component({
  selector: 'app-edit-form-response-summary-time',
  imports: [
    DatePipe
  ],
  templateUrl: './edit-form-response-summary-time.html',
  styleUrl: './edit-form-response-summary-time.scss',
})
export class EditFormResponseSummaryTime extends EditFormResponseSummaryComponent<TimeResponseSummaryRes> implements OnInit {

  protected times = signal<{ id: string, time: Date, times: { id: string, time: Date, occurrence: number }[] }[]>([])

  ngOnInit() {
    const occurrenceMap = new Map<string, number>();

    const responses = this.responseSummary().responses

    responses.forEach(r => {
      occurrenceMap.set(r, (occurrenceMap.get(r) ?? 0) + 1);
    });

    const uniqueHours = [...new Set(
      responses.map(r => new Date(r).getHours())
    )];

    const ts = uniqueHours.map(hour => {
      const hourResponses = [...new Set(
        responses.filter(r => new Date(r).getHours() === hour)
      )];

      return {
        id: crypto.randomUUID(),
        time: new Date(hourResponses[0]),
        times: hourResponses.map(r => ({
          id: crypto.randomUUID(),
          time: new Date(r),
          occurrence: occurrenceMap.get(r)!
        }))
      };
    });

    ts.sort((a, b) => a.time.getHours() - b.time.getHours())

    this.times.set(ts);
  }

  generateRandomDates(count: number): Date[] {
    const start = new Date(2000, 0, 1, 0, 0, 0, 0).getTime();
    const end = new Date(2026, 11, 31, 23, 59, 59, 999).getTime();

    // Create a smaller pool of unique dates
    const poolSize = Math.max(1, Math.floor(count / 5));

    const pool = Array.from({length: poolSize}, () => {
      const randomTime = Math.floor(Math.random() * (end - start + 1)) + start;
      return new Date(randomTime);
    });

    // Randomly reuse dates from the pool
    return Array.from({length: count}, () => {
      const date = pool[Math.floor(Math.random() * pool.length)];
      return new Date(date.getTime()); // return a copy
    });
  }

}
