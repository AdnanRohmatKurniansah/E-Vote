import { writeFile } from 'fs/promises'
import { join } from 'path'

export const uploadImage = async (foto, destinationFolder) => {
    const timestamp = Date.now()
    const fileName = `${timestamp}.jpg`
    const filePath = join(destinationFolder, fileName)
    const fileData = await foto.arrayBuffer()
    await writeFile(filePath, Buffer.from(fileData))
    return filePath.slice(filePath.indexOf('public/') + 7)
}