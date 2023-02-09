import { Component, OnInit } from '@angular/core';
import { NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';
import { MedecinService } from 'src/app/services/ServiceMedecin/medecin.service';
import { AppelVideoService } from 'src/app/services/ServicePartager/appel-video.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { AppelVideo } from 'src/app/models/modelPartager/appel-video';

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
  appelVideos:AppelVideo[];

  constructor(private ngxAgoraService: NgxAgoraService,
              private medecinService: MedecinService,
              private appelVideoService: AppelVideoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private primeNgConfig: PrimeNGConfig) {
    this.uid = Math.floor(Math.random() * 100);
  }

  ngOnInit(): void {
    this.recupereConfig();
  }


  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, evt => {});
    this.client.on(ClientEvent.Error, error => {
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
                '',
                () => console.log('Renewed the channel key successfully.'),
                renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {});
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
      }
    });

    this.client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
      }
    });
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {});

    this.localStream.on(StreamEvent.MediaAccessDenied, () => {});
  }

  rejoindreAppelVideo():void{

    this.client = this.ngxAgoraService.createClient({mode: 'rtc', codec: 'h264'});
    this.assignClientHandlers();
    this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
    this.assignLocalStreamHandlers();

    this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
  }

  private initLocalStream(onSuccess?: () => any): void {
    this.localStream.init(
            () => {
              this.localStream.play(this.localCallId);
              if (onSuccess) {
                onSuccess();
              }
            },
    );
  }

  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    this.client.join('007eJxTYCh976R67amZ+cSY6YreMv2TpLatsq954TzxGP+n/t/3T3xXYDA2MkhJSzOxMEk0MTQxMjSztEhMNUtNSko0tjROTDZOPWC+J7khkJGhZPY2BkYoBPHZGJJTc1NT8hkYAPKKIiE=', 'cemedo', this.uid, onSuccess, onFailure);
  }

  publish(): void {
    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }

  assignerAppelVideo():void{}

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }
  recupereConfig():void{
    this.primeNgConfig.setTranslation({
      startsWith: 'Commence par',
      contains: 'Contient',
      notContains: 'Ne contient pas',
      endsWith: 'Fini par',
      equals: 'Egale à',
      notEquals: 'différent de',
      noFilter: 'Pas de filtre',
      reject: 'Non',
      accept: 'Oui'
    });
  }
}
