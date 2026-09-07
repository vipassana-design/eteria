import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // next dev reescribe CLAUDE.md/AGENTS.md con su propio bloque de
  // instrucciones en cada arranque. Las reglas de trabajo de este
  // proyecto son las de CLAUDE.md y se mantienen a mano.
  agentRules: false,
}

export default nextConfig
