import isEqual from 'lodash.isequal'

export default function anechoic (target, name, descriptor) {
  const fn = descriptor.value
  let previousArgs
  descriptor.value = function () {
    if (!isEqual(arguments, previousArgs)) {
      previousArgs = arguments
      return this::fn(...arguments)
    }
  }
  return descriptor
}
