import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  public checkBox: boolean = false;
  public key!: string;
  public reverse: boolean = true;
  public params: any = { page: 1, size: 10 };

  @Input() listColumnResponsive?: any[];
  @Input() minWidth!: number;
  @Input() placeholderKey: string = 'product';
  @Input() listColumnNames!: any[];
  @Input() listData!: any[];
  @Input() totalItems!: number;
  @Input() templateOutlet!: TemplateRef<any>;
  @Input() tableName = new FormControl('');
  @Input() filterOptional: boolean = true;
  @Input() deleteItemOptional: boolean = true;
  @Input() editItemOptional: boolean = true;
  @Input() paginationOptional: boolean = true;
  @Output() handleFilterByField = new EventEmitter();
  @Output() handleDeleteById = new EventEmitter();
  @Output() handleEditById = new EventEmitter();
  @Output() handleChangePage = new EventEmitter();
  @Output() idClick = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    this.tableName.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((data: string) => {
        this.handleFilterByField.emit(data);
      });
  }

  public onSelectNumberPerPage(event: any) {
    this.params = { page: 1, size: event.target.value };
    this.handleChangePage.emit(this.params);
  }

  public sortByField(fieldName: string) {
    this.key = fieldName;
    this.reverse = !this.reverse;
  }

  public onDeleteItem(id: number) {
    this.handleDeleteById.emit(id);
  }

  public onHandleChangePage(page: number) {
    this.params = { ...this.params, page: page };
    this.handleChangePage.emit(this.params);
  }

  public onEditItem(id: number) {
    this.handleEditById.emit(id);
  }

  HandleItemClick(id: number) {
    this.idClick.emit(id);
  }
}
