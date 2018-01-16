import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../../_models/Photo';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[]
  uploader: FileUploader = new FileUploader({});  //copied from https://valor-software.com/ng2-file-upload/
  hasBaseDropZoneOver: boolean = false;           //copied from https://valor-software.com/ng2-file-upload/

  constructor() { }

  ngOnInit() {
  }
  public fileOverBase(e:any):void { //copied from https://valor-software.com/ng2-file-upload/
    this.hasBaseDropZoneOver = e;   //copied from https://valor-software.com/ng2-file-upload/
  }
}
