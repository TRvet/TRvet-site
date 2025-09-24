# Solução para Problemas de SSL/DNS - trvet.com.br

## Problemas Identificados

### 1. Múltiplos Registros A Conflitantes
- **Problema**: O domínio `trvet.com.br` possui dois registros A:
  - `99.83.190.102` (registro incorreto/antigo)
  - `75.2.60.5` (registro correto do Netlify)
- **Impacto**: Múltiplos registros A impedem a provisão correta de certificados SSL

### 2. CNAME Incorreto para Subdomínio WWW
- **Problema**: `www.trvet.com.br` aponta para `lp-trvet.netlify.app`
- **Impacto**: Nome do site Netlify pode estar incorreto

### 3. Configuração DNS Externa
- **Nameservers atuais**: `b.sec.dns.br` e `c.sec.dns.br`
- **Impacto**: Requer configuração manual precisa dos registros DNS

## Soluções Recomendadas

### OPÇÃO 1: Migrar para Netlify DNS (RECOMENDADO)

**Vantagens:**
- Configuração automática dos registros DNS
- Renovação automática de certificados SSL
- Melhor performance com CDN global
- Menos propenso a erros de configuração

**Passos:**
1. No painel do Netlify, ir em Domain Management
2. Configurar o domínio `trvet.com.br` para usar Netlify DNS
3. Anotar os nameservers fornecidos pelo Netlify
4. No registrador do domínio (.br), alterar os nameservers para os do Netlify
5. Aguardar propagação DNS (24-48 horas)
6. O Netlify criará automaticamente os registros corretos

### OPÇÃO 2: Corrigir DNS Externo (Manter Atual)

**Passos necessários no provedor DNS atual:**

1. **Corrigir Registro A do Domínio Apex:**
   ```
   Tipo: A
   Nome: @ (ou trvet.com.br)
   Valor: 75.2.60.5
   TTL: 3600
   ```
   **IMPORTANTE**: Remover o registro A `99.83.190.102`

2. **Corrigir Registro CNAME do Subdomínio WWW:**
   ```
   Tipo: CNAME
   Nome: www
   Valor: [nome-correto-do-site].netlify.app
   TTL: 3600
   ```
   **NOTA**: Verificar o nome correto do site no painel do Netlify

3. **Verificar e Remover Registros Conflitantes:**
   - Remover qualquer registro AAAA (IPv6) existente
   - Verificar se não há outros registros A para o domínio apex

## Verificações Adicionais Necessárias

### 1. Verificar Registros CAA
- Acessar: https://www.whatsmydns.net/dns-lookup/caa-records
- Inserir: `trvet.com.br`
- Se houver registros CAA, verificar se incluem `letsencrypt.org`

### 2. Verificar DNSSEC
- Acessar: https://www.whatsmydns.net/dnssec-check
- Inserir: `trvet.com.br`
- Se DNSSEC estiver habilitado, pode ser necessário desabilitá-lo

### 3. Verificar Nome Correto do Site Netlify
- No painel do Netlify, verificar o nome exato do site
- Pode ser diferente de `lp-trvet.netlify.app`

## Cronograma de Implementação

### Imediato (0-2 horas):
1. Verificar nome correto do site no Netlify
2. Verificar registros CAA e DNSSEC
3. Decidir entre Opção 1 ou Opção 2

### Curto Prazo (2-24 horas):
1. Implementar a solução escolhida
2. Monitorar propagação DNS

### Médio Prazo (24-48 horas):
1. Aguardar propagação completa
2. Renovar certificado SSL no Netlify
3. Testar acesso ao site

## Ferramentas de Monitoramento

- **Propagação DNS**: https://dnschecker.org/
- **Verificação DNSSEC**: https://www.whatsmydns.net/dnssec-check
- **Registros CAA**: https://www.whatsmydns.net/dns-lookup/caa-records
- **SSL Test**: https://www.ssllabs.com/ssltest/

## Contatos para Suporte

- **Netlify Support**: https://answers.netlify.com/
- **Documentação Netlify DNS**: https://docs.netlify.com/domains/
- **Troubleshooting SSL**: https://docs.netlify.com/domains/troubleshooting-tips/

---

**Última atualização**: $(Get-Date)
**Status**: Problemas identificados, aguardando implementação da solução