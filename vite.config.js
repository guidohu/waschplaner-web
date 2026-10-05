import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// Who runs the site, for the Impressum and the privacy policy. The values come
// from the environment at build time (.env locally, repository variables in the
// release workflow), so they never have to be committed. They go into the bundle
// base64-encoded, so tools that scan files for names and e-mail addresses find
// nothing; the pages decode them when they render (see src/site.js).
function operator(env) {
  const data = {
    name: env.VITE_OPERATOR_NAME || '',
    // Lines separated by "|", without the country: "c/o Muster AG|Musterweg 1|8000 Zürich"
    address: (env.VITE_OPERATOR_ADDRESS || '').split('|').map((l) => l.trim()).filter(Boolean),
    uid: env.VITE_OPERATOR_UID || '', // empty: not in the commercial register
    email: env.VITE_CONTACT_EMAIL || 'hallo@waschplaner.com',
  }
  return Buffer.from(JSON.stringify(data), 'utf8').toString('base64')
}

export default defineConfig(({ mode }) => {
  // '' loads all variables, including those set in the shell or by CI.
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
  return {
    plugins: [vue()],
    define: { __OPERATOR__: JSON.stringify(operator(env)) },
    test: { include: ['src/**/*.test.js'] },
    server: { port: 5174 },
  }
})
