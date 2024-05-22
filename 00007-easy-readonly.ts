// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

/** 自己加的测试用例 */

const todo1: Todo1 = {
  title: 'title',
  description: 'desc',
  completed: false,
  meta: {
    author: 'luo'
  }
}

todo1.title = ''
todo1.meta.author = 'you'

const tr: MyReadonly<Todo1> = todo1
// @ts-expect-error
tr.title = ''
// @ts-expect-error
tr.meta = { author: 'yyy' }
tr.meta.author = 'you'

// ============= Your Code Here =============
type MyReadonly<T> = {
  readonly [key in keyof T]: T[key]
}
