// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
  Expect<Equal<Exclude<never | 'A', never>, 'A'>>,
]


// ============= Your Code Here =============
type Permutation<T, K = T> = [T] extends [never]  // 禁用分布式计算，当且仅当 T 为 never 时，[T] 可以被赋值到 [never]，放回 []
  ? []
  : K extends T // K 为联合类型时会触发联合计算的分布式计算
    ? [K, ... Permutation<Exclude<T, K>>]   // 每次触发分布式计算时，从联合类型 T 中把当前被分配到的类型 Ki 排除，得到新的联合类型 T'i，再递归地对 T'i 进行分布式计算; 而非联合类型不能触发分布式计算时，Exclude<T, K> 计算为 never。
    : never