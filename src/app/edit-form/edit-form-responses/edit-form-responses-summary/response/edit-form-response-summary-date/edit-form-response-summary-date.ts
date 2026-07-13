import {Component, OnInit} from '@angular/core';
import {MatTree, MatTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle} from '@angular/material/tree';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {EditFormResponseSummaryComponent} from '../../../../../type/edit-form-response-summary-component';
import {DateResponseSummaryRes} from '../../../../../model/edit-form/responses/summary/date-response-summary-res';

interface DateNode {
  name: string;
  children?: DateNode[];
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

@Component({
  selector: 'app-edit-form-response-summary-date',
  imports: [
    MatTree,
    MatTreeNode,
    MatTreeNodePadding,
    MatTreeNodeDef,
    MatIcon,
    MatTreeNodeToggle,
    MatIconButton,
  ],
  templateUrl: './edit-form-response-summary-date.html',
  styleUrl: './edit-form-response-summary-date.scss',
})
export class EditFormResponseSummaryDate extends EditFormResponseSummaryComponent<DateResponseSummaryRes> implements OnInit {

  protected today = new Date()
  protected dataSource: DateNode[] = []
  childrenAccessor = (node: DateNode) => node.children ?? [];
  hasChild = (_: number, node: DateNode) => !!node.children && node.children.length > 0;

  ngOnInit() {

    const dates = this.responseSummary().responses.map(r => new Date(r))
    const dateMap: Map<number, Map<number, Map<number, number>>> = new Map([])

    dates.forEach(date => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      let monthMap = dateMap.get(year);
      if (!monthMap) {
        monthMap = new Map();
        dateMap.set(year, monthMap);
      }

      let dayMap = monthMap.get(month);
      if (!dayMap) {
        dayMap = new Map();
        monthMap.set(month, dayMap);
      }

      dayMap.set(day, (dayMap.get(day) ?? 0) + 1);
    })

    this.dataSource = Array.from(dateMap.entries()).map<DateNode>(([year, monthMap]) => ({
      name: year.toString(),
      children: Array.from(monthMap.entries()).map<DateNode>(([month, dayMap]) => ({
        name: MONTHS[month - 1],
        children: Array.from(dayMap.entries()).map<DateNode>(([day, count]) => ({
          name: count > 1 ? `${day.toString()} (${count})` : day.toString(),
        })),
      })),
    }));
  }

  generateRandomDates(count: number): Date[] {
    const start = new Date(2000, 0, 1).getTime();
    const end = new Date(2026, 11, 31, 23, 59, 59, 999).getTime();

    return Array.from({length: count}, () => {
      const randomTime = start + Math.random() * (end - start);
      return new Date(randomTime);
    });
  }
}
