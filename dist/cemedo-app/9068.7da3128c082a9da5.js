"use strict";(self.webpackChunkcemedoApp=self.webpackChunkcemedoApp||[]).push([[9068,776,5029,6312,1219],{25532:(u,o,r)=>{r.d(o,{e:()=>d});var a=r(40520),h=r(5e3);let d=(()=>{class n{constructor(e){this.httpPat=e,this.config="http://38.242.229.12/assures/patient/",this.config4="http://38.242.229.12/assures/",this.config2="http://38.242.229.12/ordonnances",this.config3="http://38.242.229.12/page_carnet_santes"}recupererPatient(){return this.httpPat.get(this.config+"all",{headers:new a.WM({"Content-Type":"application/json"})})}enregistrerPatient(e){return this.httpPat.post(this.config+"create",e,{headers:new a.WM({"Content-Type":"application/json"})})}recupererPatientById(e){return this.httpPat.get(this.config4+"getOne/"+e,{headers:new a.WM({"Content-Type":"application/json"})})}supprimerPatient(e){return this.httpPat.delete(this.config+"/"+e)}recupererOrdonnance(){return this.httpPat.get(this.config2,{headers:new a.WM({"Content-Type":"application/json"})})}enregistrerOrdonnance(e){return this.httpPat.post(this.config2,e,{headers:new a.WM({"Content-Type":"application/json"})})}recupererOrdonnanceById(e){return this.httpPat.get(this.config2+"/"+e,{headers:new a.WM({"Content-Type":"application/json"})})}supprimerOrdonnance(e){this.httpPat.delete(this.config2+"/"+e)}getCarnetSante(){return this.httpPat.get(this.config3,{headers:new a.WM({"Content-Type":"application/json"})})}sendCarnetSante(e){return this.httpPat.post(this.config3,e,{headers:new a.WM({"Content-Type":"application/json"})})}getCanetSanteById(e){return this.httpPat.get(this.config3+"/"+e,{headers:new a.WM({"Content-Type":"application/json"})})}deletePageCarnetSante(e){this.httpPat.delete(this.config3+"/"+e)}}return n.\u0275fac=function(e){return new(e||n)(h.LFG(a.eN))},n.\u0275prov=h.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},20776:(u,o,r)=>{r.d(o,{Ns:()=>l});var a=r(5e3);const d=new a.OlP("NGX_ECHARTS_CONFIG");let l=(()=>{class e{static forRoot(t){return{ngModule:e,providers:[{provide:d,useValue:t}]}}static forChild(){return{ngModule:e}}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[]]}),e})()}}]);