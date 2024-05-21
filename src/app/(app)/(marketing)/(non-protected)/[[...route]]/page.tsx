import Marketing from './_components/Marketing'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({ params }: { params: { route: string[] } }) => {
  // console.log('params', params)
  // const pageData = await serverClient.page.getPageData({
  //   path: params?.route,
  // })

  // return <RenderBlocks pageInitialData={pageData as PageType} slug={params} />
  return (
    <>
      <Marketing />
    </>
  )
}

export default Page
