import EmailForm from '@/components/UI/EmailForm'
import React from 'react'

const resendEmail = () => {
  return (
    <section className="w-full max-h-screen h-full flex justify-center items-center ">
        <EmailForm type={"verification"} />
      </section>
  )
}

export default resendEmail