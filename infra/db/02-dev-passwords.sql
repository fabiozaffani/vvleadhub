-- infra/db/02-dev-passwords.sql — DEV LOCAL apenas (rodado pelo docker-compose.dev.yml).
-- O roles.sql canônico cria vvf_payload/vvf_app com senha CHANGE_ME (placeholder de
-- produção, trocada por Secret na WO-06). Em dev redefinimos para uma senha local
-- descartável — a MESMA usada em admin/.env (DATABASE_URL_PAYLOAD).
ALTER ROLE vvf_payload WITH PASSWORD 'vvf_dev_only';
ALTER ROLE vvf_app     WITH PASSWORD 'vvf_dev_only';
