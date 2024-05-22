// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]


// ============= Your Code Here =============
// 不能直接使用 S['length'] 获取字符串长度，在 ts 中 string 是一种基本类型，而不是类
// 解题详细步骤可以看：https://juejin.cn/post/7111921517708967967
type LengthOfString<S extends string, CharArr extends string[] = []> = S extends `${infer First}${infer Rest}` ? LengthOfString<Rest, [... CharArr, First]> : CharArr['length']

// 递归写法二：
// type StringToArray<S extends string> = S extends `${infer T}${infer R}` ? [T, ...StringToArray<R>] : [];
// type LengthOfString<S extends string> = StringToArray<S>['length']