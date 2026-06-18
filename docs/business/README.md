# business/ — verdade do negócio (tech-neutral)

Conhecimento de domínio do vvleadhub, no padrão VV. Bounded context **distinto** do vvdomain (operações: buffet/estoque).

- [`comercial/`](comercial/) — o domínio comercial/produto que a plataforma vende: Tipo de Evento, Pacote, Serviço, Espaço, Hospedagem. Entry: [`comercial/_dominio.md`](comercial/_dominio.md); lacunas conhecidas em [`comercial/lacunas.md`](comercial/lacunas.md).

O registro de Assuntos da plataforma (specs/plataforma) **espelha** este domínio — divergência de vocabulário é defeito. Termos canônicos no [`../_lexico.md`](../_lexico.md). Novos domínios de negócio (funil de leads/SDR, atribuição) entram aqui quando mapeados (ver `comercial/lacunas.md`).
