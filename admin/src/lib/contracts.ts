// Smoke test da fronteira admin → packages/contracts. Os blocks do Payload são espelho 1:1
// dos do site e tipam props a partir daqui (Fase 0b). Payload migra SÓ o schema `payload` (D-9).
import type { SubjectType, Objective } from "@vvf/contracts";

export type AdminSubjectType = SubjectType;
export type AdminObjective = Objective;
