import isEqual from 'lodash.isequal'

export default function anechoic (target, name, descriptor) {
  const fn = descriptor.value
  let previousArgs
  descriptor.value = function (...args) {
    if (!isEqual(args, previousArgs)) {
      previousArgs = args
      return this::fn(...args)
    }
  }
  return descriptor
}
