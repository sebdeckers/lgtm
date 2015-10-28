import isEqual from 'lodash.isequal'

const cache = new WeakMap()

export default function anechoic (target, name, descriptor) {
  const fn = descriptor.value
  descriptor.value = function (...args) {
    const cachedTarget = cache.has(target)
      ? cache.get(target)
      : cache.set(target, new Map()).get(target)
    if (!isEqual(args, cachedTarget.get(name))) {
      cachedTarget.set(name, args)
      return this::fn(...args)
    }
  }
  return descriptor
}
