// services/templateService.js
import { trpc } from '@/trpc/client'

// Adjust the import according to your project structure

export async function deployTemplate() {
  try {
    // Call templateDeploy function
    const { mutateAsync: templateDeploy } =
      trpc.railway.templateDeploy.useMutation({
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

    await templateDeploy()
  } catch (error) {
    console.log('Error deploying template:', error)
  }
}
