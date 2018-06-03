import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, AfterViewInit {
  @ViewChild('searchit') private elementRef: ElementRef;
  searchTerm: string;

  constructor(
    public globalService: GlobalService,
    private cdRef: ChangeDetectorRef,
    private title: Title,
    private meta: Meta
  ) {
    this.globalService.searchTerm.next('');
    this.globalService.searchTerm.subscribe((term) => {
      this.searchTerm = term;
    });
  }

  ngOnInit() {
    this.title.setTitle('Search');
    this.meta.updateTag({ content: 'Search products and blog posts' }, 'name=\'description\'');
  }

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
    this.cdRef.detectChanges();
  }

  performSearch(event) {
    this.globalService.searchTerm.next(event);
  }

}
