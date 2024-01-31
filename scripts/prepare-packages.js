import fs from 'node:fs'
import { join } from 'node:path'

main()
  .then(() => {
    console.log('Packages Ready')
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

async function main() {
  const distFolders = [
    {
      path: 'cjs',
      type: 'commonjs'
    },
    {
      path: 'dist',
      type: 'module'
    }
  ]

  for (let folderMeta of distFolders) {
    const folderPath = join(process.cwd(), folderMeta.path)
    const doesFolderExist = fs.existsSync(folderPath)
    if (!doesFolderExist) continue

    await fs.promises.writeFile(
      join(folderPath, 'package.json'),
      JSON.stringify({ type: folderMeta.type }, null, 2),
      'utf8'
    )

    if (folderMeta.type === 'commonjs') {
      const dtsFiles = await collectDTSFiles(folderPath)
      for (let typeDefFile of dtsFiles) {
        const renamedFile = typeDefFile.replace(/(\.d\.ts)$/, '.d.cts')
        await fs.promises.rename(typeDefFile, renamedFile)
      }
    }
  }
}

async function collectDTSFiles(directory, paths = []) {
  const assets = await fs.promises.readdir(directory)
  for (let asset of assets) {
    const assetPath = join(directory, asset)
    const dir = await fs.promises.stat(assetPath)
    if (dir.isFile()) {
      paths.push(assetPath)
    } else {
      paths = paths.concat(await collectDTSFiles(assetPath, []))
    }
  }
  return paths.filter(x => x.endsWith('.d.ts'))
}
