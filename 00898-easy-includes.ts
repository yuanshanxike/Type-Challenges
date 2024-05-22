// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>, //1
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]


// ============= Your Code Here =============
// type Includes<T extends readonly any[], U> = U extends T[number] ? true : false
// https://github.com/type-challenges/type-challenges/issues/1568 Original:
// type Includes<T extends readonly any[], U> = {
//   [P in T[number]]: true
// }[U] extends true ? true : false;
// 递归遍历数组，找到严格相等（使用 Equal）的元素则返回 true，否则最终剩余数组为空集则返回 false
type NonNullDo<T, D> = T extends [] ? false : D
type Includes<T extends any, U> = 
  NonNullDo<
    T,
    T extends [infer F, ... infer REST]
      ? Equal<F, U> extends true
        ? true
        : Includes<REST, U>
      : never
  >

// type Includes<T extends any[], U> = T extends []
//   ? false
//   : T extends [infer F, ... infer REST]
//     ? Equal<F, U> extends true
//       ? true
//       : Includes<REST, U>
//     : never
