import { Component } from "@angular/core";
import * as io from "socket.io-client";
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {

  pollObj;
  voteNumber: number;
  previousVote: number=null;
  votes: Array<any> = [];
  socket: SocketIOClient.Socket;
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  constructor() {
    this.socket = io.connect('localhost:8080');
  }
  ngOnInit() {
    this.votes = new Array();
    this.listen2Events();
    
  }
  listen2Events() {
    this.socket.on("voteData", d => {
      this.pollObj=d;
      this.pieChartLabels = d.options.map(val=>val.text);
      this.pieChartData = d.options.map(val=>val.count);
    });
  }
  sendVote() {
    console.log('Vote sent for ',this.voteNumber)
    this.socket.emit("newVote", {new:this.voteNumber,old:this.previousVote});
    this.previousVote=this.voteNumber;
  }
}