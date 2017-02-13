import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import Timer = NodeJS.Timer;

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  public success: boolean;
  public isFinished: boolean;
  public error: boolean;

  private isDelayedRunning: boolean;
  private currentTimeout: Timer;

  ngOnInit() {
    this.isFinished = this.isDelayedRunning = this.success = this.error = false;
  }

  @Input()
  public delay: number = 300;

  @Input()
  public set classType(type: string) {
    if (type === 'success') {
      this.success = true;
    } else if (type === 'error') {
      this.error = true;
    } else if (type === '') {
      this.error = false;
      this.success = false;
    }
  }

  @Input()
  public set isRunning(value: boolean) {
    if (!value) {
      this.cancelTimeout();
      this.isDelayedRunning = false;
      return;
    }

    if (this.currentTimeout) {
      return;
    }

    this.currentTimeout = setTimeout(() => {
      this.isDelayedRunning = value;
      this.cancelTimeout();
    }, this.delay);
  }

  private cancelTimeout(): void {
    clearTimeout(this.currentTimeout);
    this.currentTimeout = undefined;
  }

  ngOnDestroy(): any {
    this.cancelTimeout();
  }
}
