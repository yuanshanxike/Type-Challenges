// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]


// ============= Your Code Here =============
// if type First<T extends any[]> = T[0] => Expect<Equal<First<[]>, undefined>>
// 方法一：
// type First<T extends any[]> = T extends [] ? never : T[0]
// 方法二：
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
// 方法三：
type First<T extends any[]> = T extends [infer F, ... infer REST] ? F : never

// 和本题无关，递归循环出元组中的类型元素，转化成一个联合类型：
type Tuple = [string, number, boolean]
type Head<T extends any[]> = T[0]
type Union<T, U> = T | U
type ArrayShift<T extends any[]> = T extends [first: any, ...rest: infer R] ? R : never
type Recursion<T extends any[], E = never> = {
    1: E,
    0: Recursion<ArrayShift<T>, Union<E, Head<T>>>
}[T extends [] ? 1 : 0]

type UnionTuple = Recursion<Tuple>

type judge = [] extends [] ? true : false

type casess = [
  Expect<Equal<UnionTuple, string | number | boolean>>,
  Expect<judge>
]