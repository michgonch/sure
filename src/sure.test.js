import test from "ava";
import Sure from "./sure";

test(`Sure exists`, t => {
  t.is(typeof Sure, "function");
});

test(`Throws if executor is not a function`, t => {
  const error = t.throws(() => {
    new Sure(null);
  }, Error);

  t.is(error.message, "Executor must be a function");
});

test(`Must be thenable`, t => {
  new Sure(resolve => {
    resolve(`expected`);
  }).then(value => t.is(value, `expected`));
});

test(`Must catch`, t => {
  new Sure(() => {
    throw new Error(`expected`);
  }).then(() => {}, err => t.is(err.message, `expected`));
});

test(`Must work with async`, async t => {
  const actual = await new Sure(resolve => {
    setTimeout(() => {
      resolve(`expected`);
    }, 100);
  });

  t.is(actual, `expected`);
});
