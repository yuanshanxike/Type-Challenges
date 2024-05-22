// ============= Test Cases =============
import type { Alike, Expect } from './test-utils'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}


// ============= Your Code Here =============
// 解题思路：
// https://ghaiklor.github.io/type-challenges-solutions/en/medium-chainable-options.html
type Chainable<OBJ = {}> = {
  option<K extends string, V>(key: K extends keyof OBJ ? never : K, value: V): Chainable<Omit<OBJ, K> & { [P in K] : V }> // 因为是可以链式调用的，所以需要返回一个可以继续调用 option 或 get 的 Chainable
  get(): OBJ
}