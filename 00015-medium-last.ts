// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]


// ============= Your Code Here =============
// 方法一：
// type Last<T extends any[]> = T extends [... infer PREFIX, infer LAST] ? LAST : never
// 方法二(在数组首位添加任意元素，构造成一个新的数组类型，然后取索引值为 length 的元素)：
// type Last<T extends any[]> = [unknown, ...T][T['length']]
// 方法三(递归（太复杂，没必要）)：
type ArrayShift<T extends any[]> = T extends [infer _, ... infer REST] ? REST : never
type Union<A, B> = A | B
type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
type Last<T extends any[], E = never> = {
  0: E,
  1: Last<ArrayShift<T>, Union<E, T['length'] extends 1 ? First<T> : never>>
}[T extends [] ? 0 : 1]