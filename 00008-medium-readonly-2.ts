// ============= Test Cases =============
import type { Alike, Expect } from './test-utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description' >, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}


// ============= Your Code Here =============
// extends K 的字段标记为 readonly 的到的类型 与 通过 Omit 排除 extends K 剩余的元素得到的类型 求交叉类型
type Omit<T, U extends keyof T> = {
  [key in keyof T as key extends U ? never : key]: T[key]
}
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [key in K]: T[key]
} & {
  [key in keyof Omit<T, K>]: T[key]
}

// type MyReadonly2<T, K extends keyof T = keyof T> = {
// 	readonly [P in K]: T[P];
// } & {
// 	[P in Exclude<keyof T, K>]: T[P];
// };