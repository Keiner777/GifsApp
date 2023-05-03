import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse } from '../interfaces/gifs.interface';
import { Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public GifList:Gif[]=[];
  private _tagHistory:string[]=[];
  private ApiKey:string='0iTGU28Lg9PmlAWHiyRJS6iSV8FTsAGu';
  private url:string='http://api.giphy.com/v1/gifs'

  constructor(private http:HttpClient) {
    this.loadLocalStorage()
   }

  get tagsHistory(){

    return [...this._tagHistory]

  }


  private organizeHistory(tag:string){

    tag = tag.toLowerCase();
    if(this._tagHistory.includes(tag)){
      this._tagHistory  = this._tagHistory.filter((oldTag=> oldTag!==tag))
    }

    this._tagHistory.unshift(tag);
    this._tagHistory=this.tagsHistory.splice(0,10)
    this.saveLocalStorage()

  }


  saveLocalStorage(){
    localStorage.setItem('history', JSON.stringify(this._tagHistory))
  }

  loadLocalStorage(){
    if(!localStorage.getItem('history')) return;

    this._tagHistory = JSON.parse(localStorage.getItem('history')!)
  }

 searchTag(tag: string){

   if(tag.length === 0){
    return
   }
   this.organizeHistory(tag);
   
   const params = new HttpParams()
   .set('api_key',this.ApiKey)
   .set('limit', 10)
   .set('q', tag)

    this.http.get<SearchResponse>(`${this.url}/search`, {params}).subscribe(resp=>{
      
      this.GifList=resp.data
      console.log(this.GifList);
      
    })
    // fetch('http://api.giphy.com/v1/gifs/search?api_key=0iTGU28Lg9PmlAWHiyRJS6iSV8FTsAGu&q=valorant&limit=10')
    // .then(resp=> resp.json())
    // .then(data => console.log(data))
    
  }


}
