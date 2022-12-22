import { Component, OnInit } from '@angular/core';
import { NgxAgoraService,Stream, AgoraClient, ClientEvent  } from 'ngx-agora';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  title = 'angular-video';
  localCallId = 'agora_local';
  remoteCalls: string[] = [];
  private client: AgoraClient;
  private localStream: Stream;
  private uid: number;

  constructor(private ngxAgoraService: NgxAgoraService) {
    this.uid = Math.floor(Math.random() * 100);
  }

  ngOnInit(): void {
    this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
    this.assignClientHandlers();
  }

  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
    });
  }

}
