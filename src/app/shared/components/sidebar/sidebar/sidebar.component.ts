import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // tagHistorySide:string[]= this.gifsService.tagsHistory;
  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  get tags(){
    return this.gifsService.tagsHistory
  }

  SearchHistory(tag: string){
    this.gifsService.searchTag(tag)
  }
  

  
  
  

}
