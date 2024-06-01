// services/templateService.js
import { trpc } from '@/trpc/client'

export async function deployMongodb() {
  try {
    const { mutateAsync: mongoTemplateDeploy } =
      trpc.railway.mongoTemplateDeploy.useMutation({
        onSuccess: async data => {
          try {
            console.log('done')
          } catch (error) {
            console.log(error)
          }
        },
        onError: async () => {
          console.log('Template creation failed')
        },
      })

    await mongoTemplateDeploy()
  } catch (error) {
    console.log('Error deploying template:', error)
  }
}
