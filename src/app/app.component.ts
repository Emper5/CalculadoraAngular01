import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RegExp } from "./../utils/regExp";
import { MathCalculator } from "./../enums/math.enum";
import { ErrorCalculator } from "./../enums/errors.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('inputBlured', {static: false}) inputBlured!: ElementRef;
  screen: string = MathCalculator.zero;
  title = 'basicCalculator';
  isFirstDigit = false;
  isrecurrent = false;
  first : number|undefined;
  second : number|undefined;
  operator : string = MathCalculator.empty;

  ngAfterViewInit(): void {
    this.onBlur();
  }

  onBlur() {
    this.inputBlured.nativeElement.focus();
  }

  clickOrkeyboardInput(input: string ){
    if( RegExp.operatorMatching(input) && input !== MathCalculator.dot){
      this.calculate(input);
    }
    if(input === 'Enter'){
      this.calculate(MathCalculator.equal);
    }
    if(!RegExp.numbersMatching(input)){
      return;
    }
    if(isNaN(parseFloat(this.screen)) || this.screen === MathCalculator.zero || this.isrecurrent){
      this.screen = input;
      this.isrecurrent ? this.isrecurrent = false : this.isrecurrent;
    } else {
      if(this.screen.length < 11){
        this.screen = this.screen + input
      } else {
        alert(ErrorCalculator.tooBig)
      }
    }

  }

  stopDefAction(event: KeyboardEvent) {
    event.preventDefault();
  }

  calculate(operator: string){
    let solution: string;
    if(!this.isFirstDigit){
      if(operator === MathCalculator.equal){
        return;
      }
      this.first = parseFloat(this.screen);
      this.isFirstDigit = true;
      this.operator = operator;
      this.clearActual();
      return;
    }

    if(this.operator !== MathCalculator.empty){
      this.second = parseFloat(this.screen);
      solution = this.round(eval(this.first!.toString()+this.operator+this.second.toString())).toString();
      if(solution.length < 11){
        this.screen = solution
      } else {
        this.clearAll();
        alert(ErrorCalculator.tooBig);
      }
      this.first = parseFloat(this.screen);
      this.second = 0;
      this.isrecurrent = true;
    }
    operator === MathCalculator.equal ? this.operator = MathCalculator.empty : this.operator = operator;


  }

  round(num: number) {
    var m = Number((Math.abs(num) * 100000).toPrecision(15));
    return Math.round(m) / 100000 * Math.sign(num);
  }

  changeSign(){
    let screenToNumber = parseFloat(this.screen);
    screenToNumber = screenToNumber * (-1);
    this.screen = screenToNumber.toString();
  }

  delete(){
    this.screen = this.screen.slice(0,-1);
    if(this.screen === MathCalculator.empty){
      this.screen = MathCalculator.zero;
    }
  }

  clearActual(){
    this.screen = MathCalculator.zero;
  }

  clearAll(){
    this.first = undefined;
    this.isFirstDigit = false;
    this.isrecurrent = false;
    this.second = undefined;
    this.operator = MathCalculator.empty;
    this.screen = MathCalculator.zero;

  }

}
