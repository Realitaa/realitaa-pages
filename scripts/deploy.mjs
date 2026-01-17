import { execSync } from 'child_process'

const run = cmd => execSync(cmd, { stdio: 'inherit' })

run('node scripts/images.mjs')
run('node scripts/upload-r2.mjs')
run('git push origin main')

console.log('🚀 Deploy complete')
