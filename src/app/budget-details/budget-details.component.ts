import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.css']
})
export class BudgetDetailsComponent implements OnInit, OnChanges {
  /* ***
  - the component is working on display all budget details in right side bar
    using the following options and methods:
    @inputs
      - display => open the right side bar for displaying data
      - data => instance of basic budget object {using id to load full info}
    @outputs
      - onClose => an event for close a side bar and emit `false` to parent component
      - onOpenAccounts => an event for change right side bar info to account info
                          and emit `true` to parent component
    @variables
      - categoriesTableSchema = > Array of objects for table architecture
                                  [{name,key,[format?,[currencyFormat?]],[flag?->{TRUE,FALSE}]}]
                                  name is a label and key is a tracker in primary array on loop
      - currentSelectedPayee => instance of basic Payee object to child component
    @methods
      - setCloseSide() => its a void function and it was called when closing a side bar
      - openAccounts() => its a void function and it was called to notify the parent component to
                          change view fro displaying account table
   *** */
  @Input() display: boolean;
  @Input() data: any;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onOpenAccounts: EventEmitter<any> = new EventEmitter();
  public categoriesTableSchema: any[];
  public currentSelectedPayee: any;

  constructor() {

  }

  ngOnInit(): void {

  }

  /* A void function and it was called when closing a side bar */
  setCloseSide(): void {
    this.display = !this.display;
    this.onClose.emit(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data'] && changes['data'].currentValue) {
      this.data = changes['data'].currentValue;
      /* Build a schema  for table architecture by creating array of object and pass config */
      this.categoriesTableSchema = [{name: 'name', key: 'name', currencyFormat: this.data.currency_format},
        {name: 'budgeted', key: 'budgeted', format: 'currency', currencyFormat: this.data.currency_format},
        {name: 'Activity', key: 'activity', format: 'currency', currencyFormat: this.data.currency_format},
        {name: 'AVAILABLE', key: 'balance', format: 'currency', currencyFormat: this.data.currency_format}];
      /* Extract category from source data and inject it in each category group object*/
      this.data.category_groups.forEach((catGroup) => {
        catGroup.categories = this.data.categories.filter((e) => e.category_group_id === catGroup.id);
      });
    }
  }

  /* A void function and it was called to notify the parent component*/
  openAccounts(): void {
    this.display = !this.display;
    this.onOpenAccounts.emit(true);
  }
}
