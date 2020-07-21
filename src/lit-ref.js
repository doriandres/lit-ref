// This is to be able to have refs on built in elements
if (!HTMLElement.prototype.hasOwnProperty('ref')) {
  Object.defineProperty(HTMLElement.prototype, 'ref', {
    set(newRef) {
      if (newRef.holder instanceof HTMLElement && typeof newRef.at === "string" && newRef.holder[newRef.at] !== this) {
        delete newRef.holder[newRef.at];
        Object.defineProperty(newRef.holder, newRef.at, { get: () => this, configurable: true });
      }
    }
  });
}

export const LitRef = BaseClass => class extends BaseClass {
  static get properties() {
    return { ref: { type: Object } };
  }
  set ref(newRef) {
    if (newRef.holder instanceof HTMLElement && typeof newRef.at === "string" && (!newRef.holder[newRef.at] || newRef.holder[newRef.at] !== this.forwardRef())) {
      delete newRef.holder[newRef.at];
      Object.defineProperty(newRef.holder, newRef.at, { get: this.forwardRef.bind(this), configurable: true });
    }
  }
  refAs(name) {
    if (['ref', 'refAs', 'forwardRef'].includes(name)) {
      throw new Error('Invalid ref property name');
    }
    return { holder: this, at: name };
  }
  forwardRef() {
    return this;
  }
}