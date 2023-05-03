import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'gif-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService){

  }

  serchTag(){

    const newTag = this.tagInput.nativeElement.value;
    console.log({newTag});

    this.gifsService.searchTag(newTag)

    this.tagInput.nativeElement.value='';
    

  }

}
