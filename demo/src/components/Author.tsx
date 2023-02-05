import React from 'react'
import type { Props } from 'react'

export default function Author({ name, href }: Props) {
  return (
    <div className='author' style={{ marginBottom: '0.75rem' }}>
      <p>
        <a {...{ href }}>{name}</a>
      </p>
    </div>
  )
}
