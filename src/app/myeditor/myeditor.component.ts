import {Component, OnDestroy, AfterViewInit, EventEmitter, Input, Output, OnChanges} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
declare var $;

@Component({
  selector: 'app-myeditor',
  templateUrl: './myeditor.component.html',
  styleUrls: ['./myeditor.component.css']
})
export class MyeditorComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() elementId: String;
  @Input() initialContent: string;
  @Output() onEditorKeyup = new EventEmitter();
  editor;
  constructor(private http: Http) {
  }

  uploadFile(url: string, formData: any) {
    const self = this;
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    const urls = `http://192.168.1.38:8080/drugstoreserver/v1/${url}`;
    return this.http
      .post(urls, formData, {headers: headers});
  }

  ngAfterViewInit() {
    const self = this;
    tinymce.init({
      selector: 'textarea',
      height: 500,
      plugins: ['link', 'paste', 'table', 'image'],
      skin_url: 'assets/skins/lightgray',
      paste_data_images: true,
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
      images_upload_handler: function($event, success, failure) {
        const formData = new FormData();
        const uploadUrl = 'file/?name=' + $event.filename();
        formData.append('file', $event.blob(), $event.filename());
        const headers = new Headers();
        headers.set('Accept', 'application/json');
        const urls = `http://192.168.1.38:8080/drugstoreserver/v1/${uploadUrl}`;
        self.http.post(urls, formData, {headers: headers}).subscribe(data => {
          if (data.json().success) {
            console.log(self.editor)
            // const str = data.json().message;
            // self.editor.insertContent(`<img src='http://192.168.1.38:8080/drugstoreserver/v1/file/${str}'>`);
          }
        });
      }
    });
  }

  ngOnChanges() {
    if (this.editor) {
      if (this.initialContent && this.initialContent.length > 0) {
        this.editor.setContent(this.initialContent);
      } else {
        this.editor.setContent('');
      }
    }
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }


}
