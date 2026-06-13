// Smoke test da fronteira site → packages/contracts (a ÚNICA dependência cruzada permitida).
// O collector real (D-15: analytics por proxy CF; /collect só negócio) entra na Fase 0b/F1.
import type { CanonicalEvent, LeadContract } from "@vvf/contracts";

export type SiteEvent = CanonicalEvent;
export type SiteLead = LeadContract;
