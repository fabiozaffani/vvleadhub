-- =============================================================================
-- D-9: um Postgres, dois schemas, isolamento no NÍVEL DO BANCO (não só no CI).
-- Rodar UMA vez no provisionamento (Fase 0a). Substituir as senhas por Secrets.
--
-- Por que no banco e não só no dependency-cruiser: a trava de import impede um runtime
-- de IMPORTAR código do outro; ela não impede um `drizzle-kit push` ou um SQL solto de
-- LER/DROPAR tabela do schema alheio. O role sem privilégio é a única garantia real de que
-- o api-server não derruba o schema do Payload (e vice-versa) — o footgun nº 1 do setup.
-- =============================================================================

-- Schemas (donos de migração: payload = Payload; app = Drizzle/api-server)
CREATE SCHEMA IF NOT EXISTS payload;
CREATE SCHEMA IF NOT EXISTS app;

-- Roles de aplicação (login). Senha vem de Secrets — NUNCA commitar a real.
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'vvf_payload') THEN
    CREATE ROLE vvf_payload LOGIN PASSWORD 'CHANGE_ME_payload';
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'vvf_app') THEN
    CREATE ROLE vvf_app LOGIN PASSWORD 'CHANGE_ME_app';
  END IF;
END
$$;

-- ---- Payload é dono de `payload` e NÃO enxerga `app` --------------------------
ALTER SCHEMA payload OWNER TO vvf_payload;
GRANT USAGE, CREATE ON SCHEMA payload TO vvf_payload;
REVOKE ALL ON SCHEMA app FROM vvf_payload;
ALTER DEFAULT PRIVILEGES FOR ROLE vvf_payload IN SCHEMA payload
  GRANT ALL ON TABLES TO vvf_payload;

-- ---- api-server é dono de `app` e NÃO enxerga `payload` -----------------------
ALTER SCHEMA app OWNER TO vvf_app;
GRANT USAGE, CREATE ON SCHEMA app TO vvf_app;
REVOKE ALL ON SCHEMA payload FROM vvf_app;
ALTER DEFAULT PRIVILEGES FOR ROLE vvf_app IN SCHEMA app
  GRANT ALL ON TABLES TO vvf_app;

-- search_path por role: cada um só "vê" o próprio schema por padrão.
ALTER ROLE vvf_payload SET search_path = payload;
ALTER ROLE vvf_app SET search_path = app;

-- Resultado: nenhuma FK pode atravessar schemas (referência por id, validada na aplicação);
-- nenhum runtime lê/escreve tabela do outro. Comunicação entre runtimes é por API (03 §5).
