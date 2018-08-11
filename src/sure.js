import state from "./state";

class Sure {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new Error("Executor must be a function");
    }
    this.state = state.PANDING;
    this.chained = [];

    const resolve = value => {
      if (this.state !== state.PANDING) {
        return;
      }

      if (value && typeof value.then === "function") {
        return value.then(resolve, reject);
      }

      this.state = state.FULFILLED;
      this.finalValue = value;

      for (const { onFulfilled } of this.chained) {
        onFulfilled(value);
      }

      return value;
    };
    const reject = error => {
      if (this.state !== state.PANDING) {
        return;
      }
      this.state = state.REJECTED;
      this.finalValue = error;
      for (const { onRejected } of this.chained) {
        onRejected(err);
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new Sure((resolve, reject) => {
      const _onFulfilled = value => {
        try {
          resolve(onFulfilled(value));
        } catch (err) {
          reject(err);
        }
      };
      const _onRejected = error => {
        try {
          reject(onRejected(error));
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === state.FULFILLED) {
        _onFulfilled(this.finalValue);
      } else if (this.state === state.REJECTED) {
        _onRejected(this.finalValue);
      } else {
        this.chained.push({
          onFulfilled: _onFulfilled,
          onRejected: _onRejected
        });
      }
    });
  }
}

export default Sure;
