// The automatic JSX runtime, on top of React's UMD global (it has no
// jsx-runtime of its own). Used only by the build. jsx gets one child (which
// may be a keyed list); jsxs gets static children, passed as arguments.
import * as React from 'react'

type Props = Record<string, unknown> | null
const split = (props: Props, key?: React.Key) => {
  const { children, ...rest } = (props ?? {}) as { children?: React.ReactNode }
  return { children, p: key === undefined ? rest : { ...rest, key } }
}
export const jsx = (type: React.ElementType, props: Props, key?: React.Key) => {
  const { children, p } = split(props, key)
  return children === undefined ? React.createElement(type, p) : React.createElement(type, p, children)
}
export const jsxs = (type: React.ElementType, props: Props, key?: React.Key) => {
  const { children, p } = split(props, key)
  return React.createElement(type, p, ...(children as React.ReactNode[]))
}
export const Fragment = React.Fragment
