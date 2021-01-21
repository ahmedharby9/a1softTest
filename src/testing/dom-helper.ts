import {ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

export class DOMHelper<T> {
  private fixture: ComponentFixture<T>;

  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
  }

  singleText(tagName: string): string {
    const Ele = this.fixture.debugElement.query(By.css(tagName));
    if (Ele) {
      return Ele.nativeElement.textContent;
    }
  }

  count(tagName: string): number {
    const elements = this.fixture.debugElement
      .queryAll(By.css(tagName));
    return elements.length;
  }

  countText(tagName: string, text: string): number {
    const elements = this.fixture.debugElement
      .queryAll(By.css(tagName));
    return elements.filter(element => element.nativeElement.textContent.includes(text)).length;
  }

  clickButton(buttonText: string): any {
    this.findAll('button').forEach(button => {
      const buttonElement: HTMLButtonElement =
        button.nativeElement;
      if (buttonElement.textContent === buttonText) {
        buttonElement.click();
      }
    });
  }

  clickButtonByProp(prop: string, val: string): any {
    this.findAll('button').forEach(button => {
      const buttonElement: HTMLButtonElement =
        button.nativeElement;
      if (buttonElement[prop] === val) {
        buttonElement.click();
      }
    });
  }

  findAll(tagName: string): any {
    return this.fixture.debugElement
      .queryAll(By.css(tagName));
  }

  countSubTags(tagName: string, className: string): any {
    return this.findAll(tagName).filter((elem) =>
      elem.nativeElement.firstChild.className.includes(className)).length;
  }
}
