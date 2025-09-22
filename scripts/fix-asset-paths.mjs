#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Criar diretório scripts se não existir
try {
    mkdirSync(dirname(__filename), { recursive: true });
} catch (err) {
    // Diretório já existe
}

console.log('🔧 Corrigindo caminhos de assets em arquivos HTML...');

// Buscar todos os arquivos HTML
const htmlFiles = readdirSync(projectRoot)
    .filter(file => file.endsWith('.html') && file !== 'index.html'); // index.html já foi corrigido

htmlFiles.forEach(file => {
    const filePath = join(projectRoot, file);
    console.log(`📝 Processando: ${file}`);
    
    try {
        let content = readFileSync(filePath, 'utf8');
        
        // Corrigir link CSS
        content = content.replace(
            /<link rel="stylesheet" href="styles\.css">/g,
            '<!-- Preload + fallback para aplicar estilo no primeiro paint -->\n    <link rel="preload" as="style" href="./styles.css?v=dev" onload="this.onload=null;this.rel=\'stylesheet\'">\n    <noscript><link rel="stylesheet" href="./styles.css?v=dev"></noscript>'
        );
        
        // Adicionar script para file:// após o último link no head
        if (!content.includes('location.protocol===\'file:\'')) {
            content = content.replace(
                /(<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome[^>]*>)/,
                '$1\n    <!-- Script para base automática quando aberto via file:// -->\n    <script>(function(){ if(location.protocol===\'file:\'){var b=document.createElement(\'base\');b.href=\'./\';document.head.prepend(b);} })();</script>'
            );
        }
        
        // Corrigir script
        content = content.replace(
            /<script src="script\.js"><\/script>/g,
            '<script src="./script.js?v=dev" defer></script>'
        );
        
        writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${file} corrigido`);
        
    } catch (err) {
        console.error(`❌ Erro ao processar ${file}:`, err.message);
    }
});

console.log('🎉 Correção de caminhos concluída!');