import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  /* ***
     - the component is working on display a modal that contain a transaction form and
       using the following options and methods:
   @inputs
     - data => an instance of any Array and used to bind data
     - schema => Array of objects for table architecture
                 [{name,key,[format?,[currencyFormat?]],[flag?->{TRUE,FALSE}]}]
                 name is a label and key is a tracker in primary array on loop
     - controls => an instance of an Array and used config controls
   @outputs
     - onCallBack => an event for callback controls action and emit any value to parent component
  *** */
  @Input() data: any[];
  @Input() schema: any[];
  @Input() controls: any[];
  @Output() onCallBack: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  localEval(callBack?: any, row?: any): void {
    /* pass callback functions to execute with controls click */
    eval(callBack);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data'] && changes['data'].currentValue) {
      this.data = changes['data'].currentValue;
    }
  }
}
