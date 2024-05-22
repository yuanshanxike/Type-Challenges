// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]


// ============= Your Code Here =============
type Space = ' ' | '\t' | '\n'
type Trim<S extends string> = S extends `${Space}${infer Rest}` | `${infer Rest}${Space}` ? Trim<Rest> : S  // 并不需要 `${Space}${infer Rest}${Space}` | ， 因为这个条件可以由左边有 Space 和右边有 Space 两个条件综合表示出来
