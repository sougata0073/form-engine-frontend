import {Component, OnInit, signal} from '@angular/core';
import {EditFormResponseSummaryComponent} from '../../../../../type/edit-form-response-summary-component';
import {
  DurationResponseSummaryRes
} from '../../../../../model/edit-form/responses/summary/duration-response-summary-res';

@Component({
  selector: 'app-edit-form-response-summary-duration',
  imports: [
  ],
  templateUrl: './edit-form-response-summary-duration.html',
  styleUrl: './edit-form-response-summary-duration.scss',
})
export class EditFormResponseSummaryDuration extends EditFormResponseSummaryComponent<DurationResponseSummaryRes> implements OnInit {

  protected durations = signal<{
    id: string,
    hours: number,
    durations: { id: string, hours: number, minutes: number, seconds: number, occurrence: number }[]
  }[]>([])

  ngOnInit() {
    const responses = this.responseSummary().responses

    const occurrenceMap = new Map<string, number>();

    responses.forEach(r => {
      const key = `${r.hours}:${r.minutes}:${r.seconds}`;
      occurrenceMap.set(key, (occurrenceMap.get(key) ?? 0) + 1);
    });

    const groupedByHour = new Map<number, typeof responses>();

    responses.forEach(r => {
      groupedByHour.set(r.hours, [...(groupedByHour.get(r.hours) ?? []), r]);
    });

    const result = [...groupedByHour.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([hour, durations]) => {
        const uniqueDurations = [
          ...new Map(
            durations.map(d => [
              `${d.hours}:${d.minutes}:${d.seconds}`,
              d
            ])
          ).values()
        ];

        return {
          id: crypto.randomUUID(),
          hours: hour,
          durations: uniqueDurations.map(d => ({
            id: crypto.randomUUID(),
            hours: d.hours,
            minutes: d.minutes,
            seconds: d.seconds,
            occurrence: occurrenceMap.get(`${d.hours}:${d.minutes}:${d.seconds}`)!
          }))
        };
      });

    this.durations.set(result);
  }

}
