import { useRouter } from 'next/dist/client/router'
import React from 'react'

const CoursePage = () => {
    const router = useRouter();

    console.log(router.query.courseId)


  return (
    <div>coursePage</div>
  )
}

export default CoursePage