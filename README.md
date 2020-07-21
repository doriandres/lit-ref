# LitRef
LitRef lets you enhance the way element references are handled among custom elements.

## Installation
Coming soon
```bash
npm install lit-ref
```

## Getting started

### Basic usage

Use `ref` property on any element to pass your reference. To define a reference use `refAs` method with the name of the property where reference will be hold.

```javascript
import { LitElement, html } from 'lit-element';
import { LitRef } from 'lit-ref';

class MyComponent extends LitRef(LitElement){
  onClick(){
    // 'myInput' property holds <input> reference so 'value' property is accesible
    alert(this.myInput.value);
  }
  render(){
    return html`
      <!--  Defining 'myInput' reference -->
      <input 
        .ref=${this.refAs('myInput')}
        placeholder="Type something to alert"/>

      <button @click=${this.onClick}>
        Alert
      </button>
    `;
  }
}
customElements.define('my-component', MyComponent);
```

----------

### Forwarding references

In the following scenario `<component-a>` uses `<component-b>` but it is actually interested in the `<input>` held by `<component-b>`.
Just use `forwardRef` method in `<component-b>` to forward any references to the `<input>` inside.

```javascript
import { LitElement, html } from 'lit-element';
import { LitRef } from 'lit-ref';

class ComponentA extends LitRef(LitElement){
  onClick(){
    // 'componentB' is a property reference that points to the <input> inside <component-b>
    alert(this.componentB.value);
  }
  
  render(){
    return html`
      <component-b 
        .ref=${this.refAs('componentB')}>
      </component-b>

      <button @click=${this.onClick}>Alert value</button>
    `;
  }
}
customElements.define('component-a', ComponentA);


class ComponentB extends LitRef(LitElement){
  forwardRef(){
    return this.input;
  }
  render(){
    return html`
      <input 
        .ref=${this.refAs('input')}
        placeholder="Hello..."/>
    `;
  }
}
customElements.define('component-b', ComponentB);
```

----------

### Detecting reference changes

There may be a reason to setup something when a reference changes, it can be done by handling the set of the property.

```javascript
import { LitElement, html } from 'lit-element';
import { LitRef } from 'lit-ref';

class ComponentA extends LitRef(LitElement){  
  set componentB(newRef){
    this._componentB = newRef; // Update the ref value
    this._componentB.someProperty = this.someOtherProperty; // Update any properties...
    this._componentB.addEventListener('someevent', this.somehandler); // Add any events...
  }
  
  // Don't forget the getter
  get componentB(){
    return this._componentB;
  }
  
  render(){
    return html`
      <component-b .ref=${this.refAs('componentB')}></component-b>
    `;
  }
}
customElements.define('component-a', ComponentA);
```

----------

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
