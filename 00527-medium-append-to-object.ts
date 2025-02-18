// ============= Test Cases =============
import type { Alike, Equal, Expect } from './test-utils'

type test1 = {
  key: 'cat'
  value: 'green'
}

type testExpect1 = {
  key: 'cat'
  value: 'green'
  home: boolean
}

type test2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
}

type testExpect2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
}

type test3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
}

type testExpect3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
  moon: false | undefined
}

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'moon', false | undefined>, testExpect3>>,
]


// ============= Your Code Here =============
// 方法一：
type CrossObject<T, U extends keyof any, V> = {
  [k in U]: V
} & T
// 上面这种做法看似是已经完成了新字段的插入，但交叉运算符 & 会保留参与运算的原始类型结构，即上面 CrossObject 类型会被计算保留为 { [k in U]: V } & T，这与 { [pName]: pType } 这样的平面类型是不同的。
// 还需要强制展平交叉类型：
type Flatten<C> = {
  [key in keyof C]: C[key]
}
type AppendToObject<T, U extends keyof any, V> = Flatten<CrossObject<T, U, V>>
// 详细解释：https://chat.deepseek.com/a/chat/s/fddf43d9-0618-481e-b1bf-b120045ea7eb

type Example = AppendToObject<{ a: number }, 'a', string>;  // 对于属性 a，按照交叉类型的方式计算，其类型变成 number & string

// 方法二：添加字段如果同名则放弃添加
// type AppendToObject<T, U extends keyof any, V> = {
//   [key in keyof T | U]: key extends keyof T ? T[key] : V
// }

// 方法三：添加字段如果同名则覆盖原字段类型
// type AppendToObject<T, U extends keyof any, V> = {
//   [K in keyof T | U]: K extends U 
//     ? V 
//     : K extends keyof T 
//       ? T[K] 
//       : never
// }