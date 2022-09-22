import Link from 'next/link'
import React from 'react'
import { MainTemplate } from '../../src/templates/MainTemplate'

const Final = () => {
  return (
    <MainTemplate>
        <h2>Dziękujemy za zakupy byczq</h2>
        <Link href="/">Strona główna</Link>
        <Link href="/konto/moje-zamowienia">Zobacz moje zamówienia</Link>
    </MainTemplate>
  )
}

export default Final