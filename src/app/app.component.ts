import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  AfterViewInit{

  @ViewChild('inputBlured', {static: false}) inputBlured!: ElementRef;
  screen: string = '0';
  title = 'basicCalculator';
  isFirstDigit = false;
  isrecurrent = false;
  first : number|undefined;
  second : number|undefined;
  operator : string = '';


  ngAfterViewInit(): void {
    this.onBlur();
  }

  onBlur() {
    this.inputBlured.nativeElement.focus();
  }


  clickOrkeyboardInput(input: string ){
    if(input.match("^[+-/=\*?]+$") && input !== '.'){
      this.calculate(input);
    }
    if(input === 'Enter'){
      this.calculate('=');
    }
    if(!input.match("^[0-9\.]+$")){
      return;
    }
    if(isNaN(parseFloat(this.screen)) || this.screen === '0' || this.isrecurrent){
      this.screen = input;
      this.isrecurrent ? this.isrecurrent = false : this.isrecurrent;
    } else {
      this.screen = this.screen + input
    }

  }

  stopDefAction(event: KeyboardEvent) {
    event.preventDefault();
  }

  calculate(operator: string){
    let solution: string;
    if(!this.isFirstDigit){
      if(operator === '='){
        return;
      }
      this.first = parseFloat(this.screen);
      this.isFirstDigit = true;
      this.operator = operator;
      this.clearActual();
      return;
    }
    if(this.isFirstDigit){
      if(this.operator !== ''){
        this.second = parseFloat(this.screen);
        solution = this.round(eval(this.first!.toString()+this.operator+this.second.toString())).toString();
        if(solution.length < 11){
          this.screen = solution
        } else {
          this.clearAll();
          alert('Resultado con demasiadas cifras o decimales');
        }
        this.first = parseFloat(this.screen);
        this.second = 0;
        this.isrecurrent = true;
      }
      operator === '=' ? this.operator = '' : this.operator = operator;
    }

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
    if(this.screen === ''){
      this.screen = '0'
    }
  }

  clearActual(){
    this.screen = '0';
  }

  clearAll(){
    this.first = undefined;
    this.isFirstDigit = false;
    this.isrecurrent = false;
    this.second = undefined;
    this.operator = '';
    this.screen = '0';

  }

}
