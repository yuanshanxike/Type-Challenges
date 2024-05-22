// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const sym1 = Symbol(1)
const sym2 = Symbol(2)
const tupleSymbol = [sym1, sym2] as const
const tupleMix = [1, '2', 3, '4', sym1] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleSymbol>, { [sym1]: typeof sym1; [sym2]: typeof sym2 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4'; [sym1]: typeof sym1 }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>


// ============= Your Code Here =============
type TupleToObject<T extends readonly (string | number| symbol)[]> =  {
  [K in T[number]]: K   // T[number] 表示数组 T 中的所有数字索引对应的类型所构成的联合类型
}

// 具体看：https://juejin.cn/post/7265996663406968844#heading-11 中第三题的讲解:

type tupleTest = {
  0: string,
  1: number,
  2: boolean
}
const tup: tupleTest = ['1', 1, true]

// 示例1：
interface Test {
    [p: string]: number
}
// number
type stringTypes = Test[string]

// 示例2：
type tuple = ['1', 1, true]
// true | "1" | 1
type allTypes = tuple[number]