// Entry do api-server (Express 5). Cola fina (03 §2): /collect de negócio (D-15), integração
// bidirecional com Kommo, loop fechado e geração de links xcode. Arquitetura em camadas
// (09 §1.1): routes (HTTP fino) → services (lógica pura) → repositories (schema `app`) / integrations.
// O app real entra na Fase 0b/F1 — ver docs/tasks/fase-0.md.
import type { LeadContract, LeadOutcome } from "@vvf/contracts";

export type ApiLead = LeadContract;
export type ApiLeadOutcome = LeadOutcome;
