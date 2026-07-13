import {Component, OnInit, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {EditFormResponseSummaryComponent} from '../../../../../type/edit-form-response-summary-component';
import {
  DateTimeResponseSummaryRes
} from '../../../../../model/edit-form/responses/summary/date-time-response-summary-res';

@Component({
  selector: 'app-edit-form-response-summary-date-time',
  imports: [
    DatePipe
  ],
  templateUrl: './edit-form-response-summary-date-time.html',
  styleUrl: './edit-form-response-summary-date-time.scss',
})
export class EditFormResponseSummaryDateTime extends EditFormResponseSummaryComponent<DateTimeResponseSummaryRes> implements OnInit {

  protected today = new Date()

  protected dateTimes = signal<{ id: string, date: Date, times: { id: string, time: Date, occurrence: number }[] }[]>([])

  ngOnInit() {
    const occurrenceMap = new Map<string, number>();

    const responses = this.responseSummary().responses

    responses.forEach(r => {
      occurrenceMap.set(r, (occurrenceMap.get(r) ?? 0) + 1);
    });

    const groupedByDate = new Map<string, string[]>();

    responses.forEach(r => {
      const date = new Date(r);

      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

      if (!groupedByDate.has(key)) {
        groupedByDate.set(key, []);
      }

      groupedByDate.get(key)!.push(r);
    });

    const dts = [...groupedByDate.entries()].map(([_, dateTimes]) => {
      const firstDate = new Date(dateTimes[0]);

      const uniqueTimes = [...new Set(dateTimes)];

      return {
        id: crypto.randomUUID(),
        date: firstDate,
        times: uniqueTimes.map(t => ({
          id: crypto.randomUUID(),
          time: new Date(t),
          occurrence: occurrenceMap.get(t)!
        }))
      };
    });

    dts.sort((a, b) => a.date.getTime() - b.date.getTime())

    this.dateTimes.set(dts);
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
