# .agents/skills — skills locais do repo (versionadas)

Skills **específicas deste repo** (não transversais), versionadas em git — viajam com o repo, valem em qualquer máquina e em qualquer agente. Pasta **tool-neutral** (`.agents/`): a fonte mora aqui; cada ferramenta a enxerga via seu próprio bridge.

**Bridge pro Claude Code:** o `setup-links.sh` do vvcore (função `link_repo_skills`, disparada pelo hook `SessionStart`) cria o junction/symlink **`.claude/skills → .agents/skills`** — por máquina, gitignored, recriado a cada sessão. O Claude varre `.claude/skills` (único lugar que ele lê), mas os arquivos reais vivem aqui.

- **Uma skill = uma subpasta com `SKILL.md`** (`<nome>/SKILL.md`); o nome do diretório é o que se invoca.
- **Opt-in:** esta pasta existir é o gatilho do junction. Vazia (só com este README), fica **pré-cablada** — o junction já existe, pronto pra primeira skill.
- **Precedência (gotcha):** uma skill do core (`~/.claude`, escopo usuário) **sombreia** uma skill local de mesmo nome de diretório, **sem aviso**. Nunca nomeie uma skill local igual a uma do vvcore.
- **Promoção:** skill que prova valor transversal sobe pro core via `/promote <skill>` (move + remove daqui). Uma skill mora no core **ou** no repo, nunca nos dois.

Doutrina: `ARQUITETURA-IA.md` §1 (vvcore). Mapa de todos os links: `vvcore/README.md`.
