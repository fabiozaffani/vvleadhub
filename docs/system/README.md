# system/ — a coesão (domínios integrados)

Cada `system/<domínio>.md` **agrega as specs** daquele domínio ([`../specs/`](../specs/)) e descreve o todo integrado: o que é, como as peças compõem, fronteiras com outros domínios. Não recopia o detalhe — linka. É a partir do system que se desmembram os work-orders ([`../tasks/`](../tasks/)).

- `arquitetura.md` — **transversal**: a topologia que conecta os runtimes (site · admin · api-server · PostHog · Kommo · Cloudflare), modelo de dados + isolamento D-9, segurança, SEO/perf.
- Por domínio: `plataforma` · `landing-pages` · `eventos` · `admin` · `blog` · `experimentacao` · `engenharia` · `design-system`.
