// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
]

type X1 = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type X2 = { a: string } | { b: number }

type Expected1 = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Expected2 = { readonly a: string } | { readonly b: number }


// ============= Your Code Here =============
// 对每个访问到的键的对应类型递归地设置 readonly，但需要排除类型为 Function 的键（不进行对其类型进行递归）
// 递归出口是每个基础类型，因为基础类型不能解构出键 (keyof T extends never)
// type DeepReadonly<T> = {
//   readonly [key in keyof T]: T[key] extends Function ? T[key] : DeepReadonly<T[key]>
// }

type RunExcludeFunc<F, EXE> = F extends Function ? F : EXE
type DeepReadonly<T> = {
  readonly [key in keyof T]: RunExcludeFunc<T[key], DeepReadonly<T[key]>>
}