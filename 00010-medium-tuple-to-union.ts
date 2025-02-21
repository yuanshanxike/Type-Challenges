// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]


// ============= Your Code Here =============
// type TupleToUnion<T extends (any)[]> = T extends (infer U)[] ? U : never
// or
type TupleToUnion<T extends unknown[]> = T[number]
