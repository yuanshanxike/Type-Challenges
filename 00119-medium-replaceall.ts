// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]


// ============= Your Code Here =============
type ReplaceAll<S extends string, From extends string, To extends string> = 
  S extends `${infer L}${From extends '' ? never : From}${infer R}` ? `${L}${To}${ReplaceAll<R, From, To>}` : S  // 从左向右递归调用基础版本的 Replace，每次把一个 From 替换成 To

//  如果写繁琐一些：
// type ReplaceAll<S extends string, From extends string, To extends string> = 
//   From extends '' 
//   ? S 
//   : S extends `${infer L}${From}${infer R}` ? `${L}${To}${ReplaceAll<R, From, To>}` : S

//  有助于理解 never 类型
type X = `${never}`
type Y = never

type check1 = Expect<Equal<X, Y>>
type check2 = Expect<Equal<`${never}${never}asdasdasd`, never>>
// @ts-expect-error
type error = Expect<Equal<`abc${never}de`, 'abcde'>>
